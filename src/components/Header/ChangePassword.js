import { useState } from 'react';
import { Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { validatePassword } from '../../utils/validators';
import { postChangePassword } from '../../services/apiService';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
const ChangePassword = (props) => {
    const { themeState } = props;
    const { t } = useTranslation();
    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [showErrors, setShowErrors] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
    });
    const handleValidate = () => {
        const newErrors = {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        };

        if (!form.currentPassword) {
            newErrors.currentPassword = `${t('adminPage.accountProfile.changePassword.errorCurrentPassWord')}`;
        }

        if (!form.newPassword) {
            newErrors.newPassword = `${t('adminPage.accountProfile.changePassword.errorNewPassWord')}`;
        } else if (form.newPassword === form.currentPassword) {
            newErrors.newPassword = `${t('adminPage.accountProfile.changePassword.errorNewPassWord1')}`;
        } else if (!validatePassword(form.newPassword)) {
            newErrors.newPassword = `${t('adminPage.usersManagement.modalAddUsers.invalidPassword')}`;
        }

        if (form.confirmPassword !== form.newPassword) {
            newErrors.confirmPassword = `${t('homepage.registerPage.labelInvalidConfirmPassword')}`;
        }

        setErrors(newErrors);
        setShowErrors({
            currentPassword: !!newErrors.currentPassword,
            newPassword: !!newErrors.newPassword,
            confirmPassword: !!newErrors.confirmPassword
        });

        return !Object.values(newErrors).some(Boolean); // hợp lệ nếu không có error nào
    };
    const handleChange = (field, value) => {

        setForm(prev => ({ ...prev, [field]: value }));

        if (showErrors[field]) {
            setShowErrors(prev => ({ ...prev, [field]: false }));
        }
    };
    const handleUpdate = async () => {
        if (!handleValidate()) return;
        let res = await postChangePassword(form.currentPassword, form.newPassword);
        if (res && res.EC === 0) {
            toast.success(`${t('adminPage.accountProfile.changePassword.updateSucceed')}`);
            setForm({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            })
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }




    }
    return (
        <>
            <div className="change-password-container">
                <div className={themeState ? "form-change-password theme-card-light" : "form-change-password theme-card-dark"}>
                    <div className="change-password-title mb-3 mt-3">
                        {t('adminPage.accountProfile.changePassword.title')}
                    </div>
                    <div className="change-password-content">

                        <FloatingLabel
                            label={t('adminPage.accountProfile.changePassword.currentPassword')}
                            className={themeState ? "theme-floating-light mb-3" : "theme-floating-dark mb-3"}>
                            <Form.Control
                                className={themeState ? "form-control light" : "form-control theme-card-dark"}
                                type="password"
                                placeholder="name@example.com"
                                value={form.currentPassword}
                                onChange={e => handleChange("currentPassword", e.target.value)}
                                isInvalid={showErrors.currentPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.currentPassword}
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        {/* New Password */}
                        <FloatingLabel
                            label={t('adminPage.accountProfile.changePassword.newPassword')}
                            className={themeState ? "theme-floating-light mb-3" : "theme-floating-dark mb-3"}>
                            <Form.Control
                                className={themeState ? "form-control light" : "form-control theme-card-dark"}
                                placeholder="name@example.com"
                                type="password"
                                value={form.newPassword}
                                onChange={e => handleChange("newPassword", e.target.value)}
                                isInvalid={showErrors.newPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.newPassword}
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        {/* Confirm Password */}
                        <FloatingLabel
                            label={t('adminPage.accountProfile.changePassword.confirmPassword')}
                            className={themeState ? "theme-floating-light mb-3" : "theme-floating-dark mb-3"}>
                            <Form.Control
                             className={themeState ? "form-control light" : "form-control theme-card-dark"}
                                type="password"
                                 placeholder="name@example.com"
                                value={form.confirmPassword}
                                onChange={e => handleChange("confirmPassword", e.target.value)}
                                isInvalid={showErrors.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.confirmPassword}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <div className="footer ">
                            <button className='btn btn-primary mb-4' onClick={() => handleUpdate()}>{t('adminPage.accountProfile.changePassword.btnUpdate')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ChangePassword