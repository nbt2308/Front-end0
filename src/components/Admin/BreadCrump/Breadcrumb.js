import { useTranslation } from 'react-i18next';
import "./Breadcrumb.scss";
const Breadcrumb = (props) => {
    const { breadCrumb, darkMode } = props;
    const { t } = useTranslation();

    return (
        <>
            {breadCrumb === "manageUsers" &&
                (
                    <div className={darkMode ? "breadcrumb-container light" : "breadcrumb-container dark-card"}>
                        <div className="title">
                            {t(`adminPage.usersManagement.usersManagementTitle`)}
                        </div>
                        <div className="nav-breadcrumb d-flex justify-content-center align-items-center">

                            <ol className="breadcrumb">
                                <li className={darkMode ? "breadcrumb-item basic-light" : "breadcrumb-item basic-dark"}><a href="/">{t('adminPage.breadcrumb.home')}</a></li>
                                <li className={darkMode ? "breadcrumb-item basic-light" : "breadcrumb-item basic-dark"}><a href="/admin/manage-users">{t('adminPage.breadcrumb.management')}</a></li>
                                <li className={darkMode ? "breadcrumb-item active-light" : "breadcrumb-item active-dark"} aria-current="page">{t('adminPage.breadcrumb.usersManagement')}</li>
                            </ol>

                        </div>
                    </div>

                )
            }

            {
                breadCrumb === "manageQuiz" &&
                (
                    <div className={darkMode ? "breadcrumb-container  light" : "breadcrumb-container  dark-card"}>
                        <div className="title">
                            {t('adminPage.quizzesManagement.title')}
                        </div>
                        <div className="nav-breadcrumb d-flex justify-content-center align-items-center">

                            <ol className="breadcrumb">
                                <li className={darkMode ? "breadcrumb-item basic-light" : "breadcrumb-item basic-dark"}><a href="/">{t('adminPage.breadcrumb.home')}</a></li>
                                <li className={darkMode ? "breadcrumb-item basic-light" : "breadcrumb-item basic-dark"}><a href="/admin/manage-users">{t('adminPage.breadcrumb.management')}</a></li>
                                <li className={darkMode ? "breadcrumb-item active-light" : "breadcrumb-item active-dark"} aria-current="page">{t('adminPage.breadcrumb.quizzesManagement')}</li>
                            </ol>

                        </div>
                    </div>

                )
            }

            {
                breadCrumb === "manageQuestion" &&
                (
                    <div className={darkMode ? "breadcrumb-container  light" : "breadcrumb-container  dark-card"}>
                        <div className="title">
                            {t('adminPage.questionsManagement.title')}
                        </div>
                        <div className="nav-breadcrumb d-flex justify-content-center align-items-center">

                            <ol className="breadcrumb">
                                <li className={darkMode ? "breadcrumb-item basic-light" : "breadcrumb-item basic-dark"}><a href="/">{t('adminPage.breadcrumb.home')}</a></li>
                                <li className={darkMode ? "breadcrumb-item basic-light" : "breadcrumb-item basic-dark"}><a href="/admin/manage-users">{t('adminPage.breadcrumb.management')}</a></li>
                                <li className={darkMode ? "breadcrumb-item active-light" : "breadcrumb-item active-dark"} aria-current="page">{t('adminPage.breadcrumb.questionsManagement')}</li>
                            </ol>

                        </div>
                    </div>
                )
            }

            {
                breadCrumb === "dashboard" &&
                (
                    <div className={darkMode ? "breadcrumb-container  light" : "breadcrumb-container  dark-card"}>
                        <div className="title">
                            {t('adminPage.dashboard.dashboardTitle')}
                        </div>
                        <div className="nav-breadcrumb d-flex justify-content-center align-items-center">

                            <ol className="breadcrumb">
                                <li className={darkMode ? "breadcrumb-item  basic-light" : "breadcrumb-item basic-dark"}><a href="/">{t('adminPage.breadcrumb.home')}</a></li>
                                <li className={darkMode ? "breadcrumb-item active-light" : "breadcrumb-item active-dark"} aria-current="page">{t('adminPage.breadcrumb.dashboard')}</li>
                            </ol>

                        </div>
                    </div>
                )
            }

            {
                breadCrumb === "accountProfile" &&
                (
                    <div className={darkMode ? "breadcrumb-container  light" : "breadcrumb-container  dark-card"}>
                        <div className="title">
                            {t('adminPage.accountProfile.title')}
                        </div>
                        <div className="nav-breadcrumb d-flex justify-content-center align-items-center">

                            <ol className="breadcrumb">
                                <li className={darkMode ? "breadcrumb-item basic-light" : "breadcrumb-item basic-dark"}><a href="/">{t('adminPage.breadcrumb.home')}</a></li>
                                <li className={darkMode ? "breadcrumb-item active-light" : "breadcrumb-item active-dark"} aria-current="page">{t('adminPage.breadcrumb.accountProfile')}</li>
                            </ol>

                        </div>
                    </div>
                )
            }

            {
                breadCrumb === "manageRole" &&
                (
                    <div className={darkMode ? "breadcrumb-container  light" : "breadcrumb-container  dark-card"}>
                        <div className="title">
                            {t('adminPage.rolesManagement.title')}
                        </div>
                        <div className="nav-breadcrumb d-flex justify-content-center align-items-center">

                            <ol className="breadcrumb">
                                <li className={darkMode ? "breadcrumb-item basic-light" : "breadcrumb-item basic-dark"}><a href="/">{t('adminPage.breadcrumb.home')}</a></li>
                                <li className={darkMode ? "breadcrumb-item basic-light" : "breadcrumb-item basic-dark"}><a href="/admin/manage-users">{t('adminPage.breadcrumb.management')}</a></li>
                                <li className={darkMode ? "breadcrumb-item active-light" : "breadcrumb-item active-dark"} aria-current="page">{t('adminPage.breadcrumb.rolesManagement')}</li>
                            </ol>

                        </div>
                    </div>

                )
            }
        </>
    );
}
export default Breadcrumb;