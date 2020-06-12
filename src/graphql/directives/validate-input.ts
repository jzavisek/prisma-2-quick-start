import { SchemaDirectiveVisitor } from 'apollo-server'
import { GraphQLField } from 'graphql'

const schemas = {
  // TODO: 
}

interface IValidateInputDirectiveArgs {
  schema: string
  inputFieldName: string
}

export class ValidateInputDirective extends SchemaDirectiveVisitor {

  public visitFieldDefinition(field: GraphQLField<any, any>) {
    const directiveArgs: IValidateInputDirectiveArgs = this.args as IValidateInputDirectiveArgs
    const { schema, inputFieldName } = directiveArgs

    if (!schemas[schema]) {
      throw new Error(`Validation schema "${directiveArgs.schema}" for @validateInput is not defined.`)
    }

    if (!field.args[0] || field.args[0].name !== inputFieldName) {
      throw new Error(`
        @validateInput directive expects "${inputFieldName}" variable
        for validating GraphQL mutation/query input.`)
    }

    // Override default resolve function
    const { resolve: defaultFieldResolver } = field
    field.resolve = function resolve(...args) {
      const resolverArguments = args[1]
      const context = args[2]
      const fieldValidationSchema = schemas[schema]

      // extract input field from resolver arguments by name
      // (usually input field is simply named "input")
      const input = resolverArguments[inputFieldName]
      const validatedInput = context.validate(input, fieldValidationSchema)

      // Rewrite original input field with validatedInput (as it trims leading/trailing whitespaces etc...)
      args[1] = {
        [inputFieldName]: validatedInput,
        rawInput: args[1],
      }

      // All checks passed, run default resolver
      return defaultFieldResolver.apply(this, args)
    }
  }
}
