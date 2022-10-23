<template>
  <v-row>
    <v-col class="v-col-8 v-col-sm-10">
      <v-theme-provider
        :theme="isInAdvancedMode ? 'dark' : 'light'"
        with-background
      >
        <!--    FIXME: Suggestions are only showed in the first word of the search, this is a Vuetify bug    -->
        <!--    if you uncomment the line bellow you can see the variable is correct but v-autocomplete is not detecting it    -->
        <!--    <pre>suggestions {{ suggestions }}</pre>    -->
        <v-autocomplete
          v-model:search="searchValue"
          clearable
          label="Search"
          :placeholder="message"
          :items="suggestions"
          variant="solo"
          autofocus
          :disabled="isDisabled"
          :error="hasError"
          @keyup.enter="submit"
        />
      </v-theme-provider>
    </v-col>
    <v-col class="v-col-4 v-col-sm-2">
      <v-switch
        v-model="isInAdvancedMode"
        :label="isInAdvancedMode ? 'Advanced' : 'Simple'"
        hide-details
      />
    </v-col>
  </v-row>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { VAutocomplete, VSwitch, VCol, VRow, VThemeProvider } from 'vuetify/components'

// TODO: move constants into config files
const COLUMN_NAMES = ['createdBy', 'createdAt', 'equipmentType', 'equipmentName', 'orderStatus']
const OPERATORS = ['>', '<', '>=', '<=', '=', '<>']
const SEPARATORS = ['AND', 'OR']
const QUERY_SINTAX_ARRAY = [COLUMN_NAMES, OPERATORS, []]

export default defineComponent({
  name: 'InputSearch',
  components: {
    VCol,
    VRow,
    VAutocomplete,
    VSwitch,
    VThemeProvider
  },
  watch: {
    searchValue (newValue) {
      if (!this.isInAdvancedMode) {
        return
      }

      this.hasError = false

      // Splits the typed keyword by spaces
      const splittedSearchValue = newValue.split(' ')

      // Updates QUERY_SINTAX_ARRAY every third word since the query is always [columnName, operator, *, separator]
      // Index needs to be saved since a word can have multiple chars and this would result into adding multiple times the same thing
      if (this.savedIndex !== splittedSearchValue.length && Number.isInteger(splittedSearchValue.length / 4)) {
        this.savedIndex = splittedSearchValue.length
        QUERY_SINTAX_ARRAY.push(SEPARATORS, ...QUERY_SINTAX_ARRAY.slice(0, 3))
      }

      splittedSearchValue.forEach((value: string, index: number) => {
        // Updates the suggestions autocomplete value
        this.suggestions = QUERY_SINTAX_ARRAY[index]

        const isSearchWordCorrect = QUERY_SINTAX_ARRAY[index].includes(value)

        if (!isSearchWordCorrect && value.length && QUERY_SINTAX_ARRAY[index].length) {
          this.hasError = true
        }
      })
    }
  },
  computed: {
    isDisabled (): boolean {
      // Prevents a user to add more than 10 suggestions in simple mode
      if (this.isInAdvancedMode) {
        return false
      }

      return this.suggestions.length >= 10
    }
  },
  data () {
    return {
      isInAdvancedMode: false as boolean,
      searchValue: '' as string,
      suggestions:  [] as string[],
      message: 'Press enter to submit' as string,
      hasError: false as boolean,
      savedIndex: 0 as number,
      advancedQuerySearch: [] as string[]
    }
  },
  methods: {
    initialState () {
      // Clears state
      this.message = 'Press enter to submit'
      this.hasError = false
      this.searchValue = ''
    },
    getInnerSchema (searchValue: string) {
      // This function maps the inner part of the query ex: {"=":["createdBy","Steve"]}
      const schema = (operator: string, columnName: string, text: string) => `{"${operator}":["${columnName}","${text}"]}`

      const data: string[] = []
      SEPARATORS.forEach(separator => {
        // FIXME: This only splits by the 'AND' separator missing 'OR'
        const splittedSearchValue = searchValue.split('AND')
        if (separator === 'AND') {
          splittedSearchValue.forEach(string => {
            // If we split by AND we will end up with a string like "equipmentType = "blend" OR (createdBy = "John""
            if (!string.includes('OR')) {
              const s = string.split(' ').filter(Boolean)
              data.push(schema(s[1], s[0], s[2]))
            }
          })
        }
      })

      return data
    },
    submit () {
      // Prevents empty submits
      if (!this.searchValue) {
        this.message = 'Search field cannot be empty'
        this.hasError = true

        return
      }

      if (this.hasError) {
        this.message = 'Invalid search query'
        this.searchValue = ''

        return
      }

      if (!this.isInAdvancedMode) {
        this.suggestions.push(this.searchValue)
        this.initialState()

        return
      }

      const splittedSearchValue = this.searchValue.split(' ')
      if (!(splittedSearchValue.length >= 3)) {
        this.hasError = true
        this.message = 'Invalid search query'
        this.searchValue = ''

        return
      }

      // TODO: Missing to format part of the advanced query when submitted
      return this.getInnerSchema(this.searchValue)
    }
  }
})

</script>

<style lang="scss">
.v-input__details {
  display: none;
}
</style>
