import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { FaGithub, FaPhoneSquare } from "react-icons/fa";
import { FaRegAddressCard } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import './footer.scss'
export default function Footer(props) {
    const { darkMode } = props;
    const { t } = useTranslation();
    const role = useSelector(state => state?.account?.groupWithRole?.name);
    return (
        <MDBFooter className={darkMode.value?'text-center text-lg-start text-dark sticky-bottom footer-container-light':'text-center text-lg-start text-light sticky-bottom footer-container-dark'}>
            <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
                <div className='me-5 d-none d-lg-block'>
                    <span>Get connected with us on social networks:</span>
                </div>

                <div>
                    <a href='https://github.com/nbt2308' className='me-4 text-reset'>
                        <FaGithub size={24} />
                    </a>
                </div>
            </section>

            <section className='main-footer'>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <MDBRow className='mt-3'>
                        <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                <MDBIcon color='secondary' icon='gem' />
                                Quiz website
                            </h6>
                            <p>
                                {t('homepage.sideTitle.titletop')}
                            </p>
                        </MDBCol>

                        <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4 navigation'>
                            <h6 className='text-uppercase fw-bold mb-4'>{t('homepage.footer.navigation')}</h6>
                            <p>
                                <a href='/' className='text-reset text-decoration-none link-primary'>
                                    {t('homepage.header.home')}
                                </a>
                            </p>
                            <p>
                                <a href='/users' className='text-reset text-decoration-none link-primary'>
                                    {t('homepage.header.play')}
                                </a>
                            </p>
                            {
                                role && role === 'Dev' &&
                                <p>
                                    <a href='/admin' className='text-reset text-decoration-none link-primary'>
                                        {t('homepage.header.admin')}
                                    </a>
                                </p>
                            }

                            <p>
                                <a href='/aboutus' className='text-reset text-decoration-none link-primary'>
                                    {t('homepage.header.aboutUs')}
                                </a>
                            </p>
                            <p>
                                <a href='/contact' className='text-reset text-decoration-none link-primary'>
                                    {t('homepage.header.contact')}
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>{t('homepage.header.contact')}</h6>
                            <p>
                                <FaRegAddressCard className='me-2' />
                                An Giang, Vietnam
                            </p>
                            <p>
                                <MdEmail className='me-2' />
                                quizwebsite@gmail.com
                            </p>
                            <p>
                                <FaPhoneSquare className='me-2' />+84 867 647 911
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                <span>© 2026 Copyright: </span>
                <a className='text-reset fw-bold text-decoration-none me-2' href='/'>
                    Quiz website
                </a>
            </div>
        </MDBFooter>
    );
}