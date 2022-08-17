import React, { useEffect } from 'react'
import styles from './Footer.module.css'
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import {
    useLocation 
} from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const disabledPaths = ['/login', '/register'];

  useEffect(()=>{
    if(disabledPaths.includes(location.pathname)){
      document.getElementById('footer').style.display = 'none';
    }else{
        document.getElementById('footer').style.display = 'flex';
    }
  }, [location]);

  return (
    <div className={styles.footer} id="footer">
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
