import React, { useState, useEffect } from 'react';
// import './components.css';
// import styles from './Consultants.module.css';
import styles from './TheTeam.module.css';

const baseLink = process.env.REACT_APP_API_ADDRESS || 'http://localhost:3001';

function TheTeam() {
  const [consultants, setConsultants] = useState([]);

  const getConsultants = async () => {
    const response = await fetch(`${baseLink}/api/v0/users`);
    const consultants = await response.json();
    const teamMembers = consultants.filter((element) => { if (element.accessLevel.includes('developer')) { return element; } });
    // console.log('team members', teamMembers);
    // console.log(consultants);
    return setConsultants(teamMembers);
  };
  useEffect(() => {
    getConsultants();
  }, []);

  return (
    <main className={styles.mainContainer}>
      <div className={styles.headingContainer}>
        {/* <h2 className={styles.heading2}>The <br /><span className={styles.dreamteam} >One Source</span> <br /> Team!</h2> */}
        <h2 className={styles.heading2}>We wouldn&apos;t be One Source without our <span className={styles.dreamteam}>awesome dreamteam</span>!</h2>
        <img src="/IMG/—Pngtree—arc arrow vector diagram_5054191_2.png" alt="arrow" className={styles.arrow} />
        {/* <div><p><i className="arrow right"></i></p></div> */}
      </div>
      <section className={styles.teamMemberContainer}>
        {consultants.map((person) => (
          <div className={styles.teamMember} key={person.id}>
            <img src={`/IMG/${person.image}`} alt={person.name} className={styles.image} />
            <h3>{person.name}</h3>
            {/* <div><span className={styles.icons}><i className="bi bi-phone-fill"></i></span><span>{person.phone}</span></div> */}
            {/* <div><span className={styles.icons}><i className="bi bi-envelope-fill"></i></span><span>{person.email}</span></div> */}
            <p className={styles.skills}>frontend developer</p>
            <div className={styles.separator}></div>
            {/* <hr className={styles.separator} /> */}
            <p className={styles.aboutTeamMember}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem quidem eius labore incidunt voluptate!</p>
            <div className={styles.socialIconsContainer}>
              <i className="bi bi-linkedin"></i>
              <i className="bi bi-github"></i>
            </div>
            {/* <i class="bi bi-facebook"></i> */}
          </div>
        ))}
      </section>
    </main>
  );
}

export default TheTeam;
