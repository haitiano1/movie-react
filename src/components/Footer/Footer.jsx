import React from 'react'
import style from './style.module.css'

export default function
    () {
    return (
        <footer className={style.footer}>
            <div className={style.footer__info}>
                <div className="container">
                    <div className={`${style.footer__text} row`}>
                        <div className="footer__item col-lg-2 col-sm-6">
                            <h6 className={style.footer__item}>Quick links</h6>
                            <ul className={`${style.footer__list} ${style.footer__mg}`}>
                                <li><a><span className="fa fa-angle-double-right mr-2" />Home</a>
                                </li>
                                <li><a><span className="fa fa-angle-double-right mr-2" />About</a>
                                </li>
                                <li><a><span className="fa fa-angle-double-right mr-2" />Courses</a></li>
                                <li><a><span className="fa fa-angle-double-right mr-2" />Contact</a></li>
                            </ul>
                        </div>
                        <div className="footer__item col-lg-3 col-sm-6 pl-lg-5 mt-sm-0 mt-4">
                            <h6 className={style.footer__item}>HELP &amp; SUPPORT</h6>
                            <ul className={`${style.footer__list} ${style.footer__mg}`}>
                                <li><a><span className="fa fa-angle-double-right mr-2" />Live Chart</a>
                                </li>
                                <li><a><span className="fa fa-angle-double-right mr-2" />Faq</a>
                                </li>
                                <li><a><span className="fa fa-angle-double-right mr-2" />Support</a></li>
                                <li><a><span className="fa fa-angle-double-right mr-2" />Terms of Services</a></li>
                            </ul>
                        </div>
                        <div className="footer__item col-lg-3 col-sm-6 mt-lg-0 mt-sm-5 mt-4">
                            <h6 className={style.footer__item}>CONTACT</h6>
                            <ul className={`${style.footer__list} ${style.footer__mg}`}>
                                <li><a><span className="fa-solid fa-envelope mr-2" />info@example.com</a>
                                </li>
                                <li><a><span className="fa fa-phone mr-2" />+44-000-888-999</a>
                                </li>
                                <li><a><span className="fa fa-map-marker mr-2" />London, 235 Terry, 10001</a></li>
                            </ul>
                        </div>
                        <div className="footer__item bd-left col-lg-4 col-sm-6 pl-lg-5 mt-lg-0 mt-sm-5 mt-4">
                            <h6 className={style.footer__item}>ABOUT</h6>
                            <p  className={style.footer__list}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
                                rem
                                aperiam, eaque ipsa quae ab.</p>
                            <div  className={`${style.footer__list}`}>
                                <i className="fa-brands fa-facebook mr-2" />
                                <i className="fa-brands fa-linkedin mr-2" />
                                <i className="fa-brands fa-twitter mr-2" />
                                <i className="fa-brands fa-google-plus mr-2" />
                                <i className="fa-brands fa-github mr-2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    )
}
