import { getValidateFieldStrategyFactory } from "./ValidateFieldStrategy";

const CustomFieldValidator = (field_name, text) => {
    const validateStrategyFactory = getValidateFieldStrategyFactory();
    const strategy = validateStrategyFactory.create(field_name);
    return strategy.validateText(text);
  };
export {CustomFieldValidator}
