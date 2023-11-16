<a name="readme-top"></a>

<!--
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/XPRESS-TRUCKERS/Xpress-Truckers-Web-App">
    <img src="images/logo.png" alt="Logo" width="" height="80">
  </a>

  <h3 align="center">XPRESS TRUCKERS</h3>

  <p align="center">
    An Awesome way to transport your goods.
    <br />
    <a href="http://144.126.221.185/"><strong>Explore The App »</strong></a>
    <br />
    <br />
    <a href="http://165.232.132.160/">View Demo</a>
    ·
    <a href="https://github.com/XPRESS-TRUCKERS/Xpress-Truckers-Web-App/issues">Report Bug</a>
    ·
    <a href="https://github.com/XPRESS-TRUCKERS/Xpress-Truckers-Web-App/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <!-- <li><a href="#acknowledgments">Acknowledgments</a></li> -->
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](http://144.126.221.185/)

Welcome to Xpress Truckers Web App, an innovative logistics solution designed to streamline the transportation of goods and enhance the coordination of logistics workflows. This application facilitates user authentication, driver services, image storage, service definitions, trip tracking, and vehicle management. Developed with a Flask backend and React.js framework for the frontend, this project showcases a harmonious integration of technologies to deliver a seamless user experience. The use of JWT ensures robust user authentication, while the inclusion of MySQL and SQLAlchemy for data management exemplifies a comprehensive approach to database design.

Feel free to explore the codebase, contribute, or report issues. Your engagement is invaluable in refining and evolving this project to meet the dynamic demands of the logistics landscape. Join us in revolutionizing the way goods are transported, bringing efficiency and convenience to the doorstep of our users.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]
- [![Flask][Flask]][Flask-url]
- [![NodeJS][NodeJS]][NodeJS-url]
- [![Bootstrap][Bootstrap.com]][Bootstrap-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started and Usage

To run the app you'll need to spin up 2 terminals, One for the frontend, and the other for the backend.

### Prerequisites

1. npm

   ```sh
   npm install npm@latest -g
   ```

2. Clone the repo

   ```sh
   git clone https://github.com/XPRESS-TRUCKERS/Xpress-Truckers-Web-App.git
   ```

### Installation

To run the backend:

1. Change directory to frontend
   ```sh
   cd backend
   ```
2. Setup the database with the given sql script and some dump data

   ```sh
   cat dump.sql | mysql -uroot -hlocalhost -p
   ```

3. Running the api
   ```sh
   XT_ENV=dev XT_MYSQL_USER=xt_dev XT_MYSQL_PORT=3306 XT_MYSQL_DB=xt_dev_db XT_MYSQL_HOST=localhost XT_MYSQL_PWD=xt_dev_pwd python3 -m api.v1.app
   ```

To run the frontend:

1. Change directory to frontend
   ```sh
   cd ../frontend
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the frontend
   ```js
   yarn run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Features

Register and log in as a user, driver, or admin.
Access driver services, manage images, define services, track trips, and handle vehicle management.
Experience the seamless coordination of logistics services.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

<b>Phase 1: Initial Development (Completed)</b>

Set up the project structure, database schema, and API endpoints.
Implement basic functionalities like user registration, authentication, and role-based access.
Create core features for driver services, image management, service definitions, trip tracking, and vehicle management.

<b>Phase 2: User Interface Enhancement (In Progress) </b>

Improve UI/UX design for a more intuitive and visually appealing user experience.
Optimize responsiveness for various devices, ensuring seamless access from desktop to mobile.

<b> Phase 3: Additional Features (Upcoming) </b>

Introduce advanced features such as real-time trip tracking, route optimization, and push notifications.
Enhance driver and user profiles with more details and customization options.

<b>Phase 4: Security and Performance (Future) </b>

Implement additional security measures, including encryption for sensitive data and enhanced authentication methods.
Optimize backend and frontend code for improved performance and faster loading times.

<b> Phase 5: Community Engagement and Feedback (Ongoing)</b>

Encourage community involvement through open-source contributions and feedback.
Conduct regular user surveys and feedback sessions to identify areas for improvement and new feature ideas.

<b> Phase 6: Global Expansion (Future)</b>

Explore partnerships and collaborations to expand the app's services to new regions.
Localize the application to support multiple languages and adapt to diverse markets.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## Related Projects

1. Amitruck

2. Lori Systems

3. Pickit

4. Trusted Dispatch

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE.md` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Lennox Namasaka - [LinkedIn](https://www.linkedin.com/in/lennoxnamasaka/) - [Twitter](https://twitter.com/namasaka_) - [Email](mailto:namasaka.matimbai@gmail.com)

Fredrick Kyeki - [LinkedIn](https://www.linkedin.com/in/fredrick-kyeki-554177205/) - [Email](mailto:fredrickisaac142@gmail.com)

Project Link: [Landing Page](http://144.126.221.185/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/XPRESS-TRUCKERS/Xpress-Truckers-Web-App.svg?style=for-the-badge
[contributors-url]: https://github.com/XPRESS-TRUCKERS/Xpress-Truckers-Web-App/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/XPRESS-TRUCKERS/Xpress-Truckers-Web-App.svg?style=for-the-badge
[forks-url]: https://github.com/XPRESS-TRUCKERS/Xpress-Truckers-Web-App/network/members
[stars-shield]: https://img.shields.io/github/stars/XPRESS-TRUCKERS/Xpress-Truckers-Web-App.svg?style=for-the-badge
[stars-url]: https://github.com/XPRESS-TRUCKERS/Xpress-Truckers-Web-App/stargazers
[issues-shield]: https://img.shields.io/github/issues/XPRESS-TRUCKERS/Xpress-Truckers-Web-App.svg?style=for-the-badge
[issues-url]: https://github.com/XPRESS-TRUCKERS/Xpress-Truckers-Web-App/issues
[license-shield]: https://img.shields.io/github/license/XPRESS-TRUCKERS/Xpress-Truckers-Web-App.svg?style=for-the-badge
[license-url]: https://github.com/XPRESS-TRUCKERS/Xpress-Truckers-Web-App/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/lennoxnamasaka
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Flask]: https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white
[Flask-url]: https://vuejs.org/
[NodeJS]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[NodeJS-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
