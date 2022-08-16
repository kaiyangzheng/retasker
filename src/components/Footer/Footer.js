import React from 'react'
import styles from './Footer.module.css'
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
  return (
    <div className={styles.footer}>
        <div className={styles.footer__content}>
            <div className={styles.contact}>
                <div className={styles.contactButtons}>
                    <a href="mailto:kaiyang.zheng@gmail.com" target="_blank" rel="noopener noreferrer" style={{
                        color: 'inherit',
                    }}>
                        <EmailIcon />
                    </a>
                    <a href="https://www.github.com/kaiyangzheng" target="_blank" rel="noopener noreferrer" style={{
                        color: 'inherit',
                    }}>
                        <GitHubIcon />
                    </a>
                    <a href="https://www.linkedin.com/in/kaiyang-zheng-843290160/" target="_blank" rel="noopener noreferrer" style={{
                        color: 'inherit',
                    }}>
                        <LinkedInIcon />
                    </a>
                    <a href="https://www.instagram.com/kaiyangzheng1/" target="_blank" rel="noopener noreferrer" style={{
                        color: 'inherit',
                    }}>
                        <InstagramIcon />
                    </a>
                </div>
            </div>
            <div className={styles.copyright}>
                <p>
                    © 2022 Retask. All rights reserved.
                </p>
            </div>
        </div>
    </div>
  )
}
