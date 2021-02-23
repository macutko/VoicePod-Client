import { getValidateFieldStrategyFactory } from "./ValidateFieldStrategy"

const CustomFieldValidator = (fieldName, text) => {
	const validateStrategyFactory = getValidateFieldStrategyFactory()
	const strategy = validateStrategyFactory.create(fieldName)
	return strategy.validateText(text)
}
export {CustomFieldValidator}
