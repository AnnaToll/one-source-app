import useIntro from '../hooks/useIntro';


const Intro = () => {

    const { hidden, handleClick } = useIntro();

    return (
        <div className={`intro-fs ${hidden}`}>
            <div className='dark-fs' onClick={ handleClick } />
            <section className='intro-container'>
                <h1>Welcome to my sandbox <i className='bi bi-emoji-smile'></i></h1>
                <h4>One Source started of as a group project, but since I have a tendancy to alway want to learn more, I continued to develop the app on my own. I found it to be an excellent opportunity to dig deeper in React, and learning more about other aspects of developing I was curious about.</h4>
                <h4>The project is built with React, Node.js/Express, MongoDB and is hosted on Heroku.</h4>
                <h3>My contributions are:</h3>
                <ul>
                    <li>
                        <div>
                            <i className='bi bi-chat-dots'></i>
                            <h4>Live support chat</h4>
                        </div>
                        <p>With a queue sytem, and interface for both support agent and customers. I built the Live chat using Socket.io.</p>
                    </li>
                    <li>
                        <div>
                            <i className='bi bi-shield-check'></i>
                            <h4>JWT authentication</h4>
                        </div>
                        <p>I Implemented both access tokens and refresh tokens for authentication.</p>
                    </li>
                    <li>
                        <div>
                            <i className='bi bi-file-earmark-lock2'></i>
                            <h4>Admin pages</h4>
                        </div>
                        <p>Admin pages using protected routes that can be accessed depending on access level in jwt access token.</p>
                    </li>
                    <li>
                        <div>
                            <i className='bi bi-filetype-jsx'></i>
                            <h4>React Hooks</h4>
                        </div>
                        <p>I have used most of the hooks, inlcuding custom hooks, to create separation of concern and make code more effective and easy to work with.</p>
                    </li>
                    <li>
                        <div>
                            <i className='bi bi-segmented-nav'></i>
                            <h4>Header</h4>
                        </div>
                        <p>I have designed and created all functionality relating to the header and login / register component.</p>
                    </li>
                    <li>
                        <div>
                            <i className='bi bi-palette'></i>
                            <h4>Design</h4>
                        </div>
                        <p>The entire landing page (the part you see when first entering the app) is of my design, including the chat icon that is created almost entirely with css.</p>
                    </li>
                    <li>
                        <div>
                            <i className='bi bi-github'></i>
                            <h4>CI/CD Pipeline</h4>
                        </div>
                        <p>A Pipeline in github actions that tests the code and sends the code to Heroku if all tests passes.</p>
                    </li>
                    <li>
                        <div>
                            <i className='bi bi-card-checklist'></i>
                            <h4>Tests</h4>
                        </div>
                        <p>I have written integration tests using Jest and Supertest, and end-to-end tests with Cypress.</p>
                    </li>
                    <li>
                        <div>
                            <i className='bi bi-list'></i>
                            <h4>To be added...</h4>
                        </div>
                        <p>I have not had the time to make the app responsive yet, but I have other projects that are. Feel free to check out my <a href='https://annatoll.github.io/portfolio-new/' rel='noreferrer' target='_blank'>portfolio</a> {'if you feel like it! :)'}</p>
                    </li>
                </ul>
                <address>
                    <h3>Contact</h3>
                    <p>If you want to get in touch, I will always be happy to hear from you!</p>
                    <div className='address'>
                        <p><i className='bi bi-phone-fill'></i> +46 733 92 92 85</p>
                        <p>
                            <i className='bi bi-palette2'></i>
                            My 
                            <a href='https://annatoll.github.io/portfolio-new/' rel='noreferrer' target='_blank'> portfolio</a>
                        </p>
                        <p><i className='bi bi-envelope'></i> anna.toll@protonmail.com</p>
                    </div>
                    <div>
                        <p>Best regards,</p>
                        <p>Anna</p>
                    </div>
                </address>
            </section>

        </div>

    );

};

export default Intro;