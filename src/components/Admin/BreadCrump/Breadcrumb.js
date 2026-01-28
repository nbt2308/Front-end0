import { useTranslation } from 'react-i18next';
import "./Breadcrumb.scss";
const Breadcrumb = (props) => {
    const { breadCrumb, darkMode } = props;
    const { t } = useTranslation();

    return (
        <>
            {breadCrumb &&
                (
                    <div className={darkMode ? "breadcrumb-container light" : "breadcrumb-container dark-card"}>
                        <div className="title">
                            {t(`adminPage.breadcrumb.${breadCrumb}`)}
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
        </>
    );
}
export default Breadcrumb;