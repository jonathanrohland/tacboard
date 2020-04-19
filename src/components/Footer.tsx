import React from 'react';

import githubIcon from '../images/GitHub-Mark-32px.png'

import './Footer.css';
import { useTranslation } from 'react-i18next';

function Footer() {
    const { t } = useTranslation();

    return (
        <div className="footer">
            <div className="footer__content">
                <a href="/about.html" className="footer__link">{t('footer__about-link')}</a>
                <a href="/privacy.html" className="footer__link">{t('footer__privacy-link')}</a>
                <a className="footer__link" href="https://github.com/jonathanrohland/tacboard-frontend">
                    <img className="footer__github-icon" src={githubIcon} alt={t('github-icon-alt-text')} />
                    Sieh dir den Code an
                </a>
                <a href="https://www.buymeacoffee.com/tacbrett" className="footer__link">{t('footer__buy-me-a-beer-link')}</a>
            </div>
        </div>
    );
}

export default Footer;
