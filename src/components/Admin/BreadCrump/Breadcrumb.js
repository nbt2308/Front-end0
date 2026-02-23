import { useTranslation } from 'react-i18next';
import "./Breadcrumb.scss";
const Breadcrumb = (props) => {
    const { breadCrumb, themeState } = props;
    const { t } = useTranslation();

    return (
        <>
            {breadCrumb &&
                (
                    <div className={themeState ? "breadcrumb-container light" : "breadcrumb-container theme-card-dark"}>
                        <div className="title">
                            {t(`adminPage.breadcrumb.${breadCrumb}`)}
                        </div>
                        <div className="nav-breadcrumb d-flex justify-content-center align-items-center">

                            <ol className="breadcrumb">
                                <li className={themeState ? "breadcrumb-item basic-light" : "breadcrumb-item basic-dark"}><a href="/">{t('adminPage.breadcrumb.home')}</a></li>
                                <li className={themeState ? "breadcrumb-item basic-light" : "breadcrumb-item basic-dark"}><a href="/admin/manage-users">{t('adminPage.breadcrumb.management')}</a></li>
                                <li className={themeState ? "breadcrumb-item active-light" : "breadcrumb-item active-dark"} aria-current="page">{t(`adminPage.breadcrumb.${breadCrumb}`)}</li>
                            </ol>

                        </div>
                    </div>

                )
            }
        </>
    );
}
export default Breadcrumb;