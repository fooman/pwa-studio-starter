import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from "@fortawesome/pro-light-svg-icons";
import { string, bool, shape, func } from 'prop-types';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { usePassword } from '@magento/peregrine/lib/talons/Password/usePassword';

import Button from '@magento/venia-ui/lib/components/Button';
import Field from '@magento/venia-ui/lib/components/Field';
import TextInput from '../../../../components/TextInputWithIcon/textInput';
import { isRequired } from '@magento/venia-ui/lib/util/formValidators';

import defaultClasses from '@magento/venia-ui/lib/components/Password/password.css';

const Password = props => {
    const {
        classes: propClasses,
        label,
        fieldName,
        isToggleButtonHidden,
        autoComplete,
        validate,
        ...otherProps
    } = props;
    const talonProps = usePassword();
    const { visible, togglePasswordVisibility } = talonProps;
    const classes = mergeClasses(defaultClasses, propClasses);

    const passwordButton = (
        <Button
            className={classes.passwordButton}
            onClick={togglePasswordVisibility}
        >
            {visible ? <FontAwesomeIcon size={'2x'} onClick={togglePasswordVisibility} icon={ faEye } /> : <FontAwesomeIcon size={'2x'} onClick={togglePasswordVisibility} icon={ faEyeSlash } />}
        </Button>
    );

    const fieldType = visible ? 'text' : 'password';

    return (
        <Field label={label} classes={{ root: classes.root }}>
            <TextInput
                after={!isToggleButtonHidden && passwordButton}
                autoComplete={autoComplete}
                field={fieldName}
                type={fieldType}
                validate={validate}
                {...otherProps}
            />
        </Field>
    );
};

Password.propTypes = {
    autoComplete: string,
    classes: shape({
        root: string
    }),
    label: string,
    fieldName: string,
    isToggleButtonHidden: bool,
    validate: func
};

Password.defaultProps = {
    isToggleButtonHidden: true,
    validate: isRequired
};

export default Password;
