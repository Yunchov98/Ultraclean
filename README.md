# Ultraclean

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.1.

This is my first Single Page Application with Angular. The app aims to allow customers to order cleaning and apply for jobs when interested. Administrators can take orders, create new services and review job applications, and can dismiss employees.

## How to install it locally ?
1. Clone the repository: https://github.com/Yunchov98/Ultraclean.git;
2. Navigate to the App folder;
3. Write in the terminal "npm install" or "npm i" to install all needed files for the application
4. Write "ng serve" or "ng s" to run the application via Angular CLI
5. Open your browser and go to: http://localhost:4200;

## What I used to create this app
1. Angular 16
2. Tailwind CSS
3. ng-select
4. firebase-tools

## Deployment
This application is deployed via firebase
### You can access it here -> https://ultraclean-1f04b.web.app/home
- You can view it as a guest or you can register.
- If you don't want to register you can check it out with one of the following profiles:

As a user, you can book a service or apply for a job. Also once you make a correct service request you can view it in your profile.
  
1.Email: peter@abv.bg
  - password: 12345678

2.Email: mary@abv.bg
  - password: 12345678
  
3.Email: john@abv.bg
  - password: 12345678

Admin Profile:

As an admin you can view and approve or deny a cleanup request. You can view and accept or decline a job request. Once you accept a cleaning request, it will be displayed in your profile in the Accepted Orders section. When you click the Done button on an accepted order, it will be sent to the Finished Orders section where all the orders you have completed are. You can also add new services or adjust old ones. As an admin you can release an employee by logging into Our Team, which is located in the footer and clicking the release button.

1.Email: admin@admin.com
  - password: 12345678
## These accounts are not real. They are for testing purposes!

## Aplication Views

### Guest View
  1.Home View
  ![guest-home](https://github.com/Yunchov98/Ultraclean/assets/107936254/113aff1a-b523-4895-8ced-916c7c9dca52)

  2.About Us View
  ![about-us](https://github.com/Yunchov98/Ultraclean/assets/107936254/d13a4eb5-907d-4384-9aa6-30b3be9196e2)

  3.Services View
  ![user-services-view](https://github.com/Yunchov98/Ultraclean/assets/107936254/9b933fcb-86fa-46da-b478-99dbf19d2302)

  4.Login Form View
  ![login-form](https://github.com/Yunchov98/Ultraclean/assets/107936254/b02f17eb-8eae-4eb5-8bbc-c6513474821e)

  5.Register Form View
  ![register-form](https://github.com/Yunchov98/Ultraclean/assets/107936254/7ef82399-884d-4b18-8c71-32a09ff5dd03)

  6.Products View
  ![our-products](https://github.com/Yunchov98/Ultraclean/assets/107936254/d0f6ca22-abf7-4a5b-ad2a-a84a3f787bd2)

  7. Our Team View
  ![our-team-user-view](https://github.com/Yunchov98/Ultraclean/assets/107936254/b84873cb-a08d-48d1-bf74-c8d79c04e7de)

  8. Contacts View
  ![contacts](https://github.com/Yunchov98/Ultraclean/assets/107936254/203256c4-4a5c-4990-91cf-298ed01afbf0)

  9. Footer View
  ![footer](https://github.com/Yunchov98/Ultraclean/assets/107936254/f696854b-f4a3-4d2a-8dca-19a4128a3adf)

### User View
Users have access to all pages that guests do. Users have access to pages that guests do not.

1.Home View
![user-home-view](https://github.com/Yunchov98/Ultraclean/assets/107936254/869ecab6-6664-4e2e-8ccc-e094409078ab)

2.Job Form View
![empty-job-form](https://github.com/Yunchov98/Ultraclean/assets/107936254/880e2e48-5d63-4a99-9bd3-3be2ea658610)
![filled-job-form](https://github.com/Yunchov98/Ultraclean/assets/107936254/21904e1f-59a6-4278-9078-16f94dfd081b)

3. Booking Form View
![empty-booking-form](https://github.com/Yunchov98/Ultraclean/assets/107936254/fd505047-e13d-4818-9f19-0a60da68408a)
![filled-booking-form](https://github.com/Yunchov98/Ultraclean/assets/107936254/781b39f4-4afd-43be-bf68-83564c5ba3c7)

4.Profile View
![user-orders](https://github.com/Yunchov98/Ultraclean/assets/107936254/b25fe6ce-a270-4815-b514-228edc73e985)
![rejected-requests-user](https://github.com/Yunchov98/Ultraclean/assets/107936254/9483d40f-15e4-419b-9486-1843635c29e2)
![all-orders](https://github.com/Yunchov98/Ultraclean/assets/107936254/cea86987-a7b9-44a6-805c-cda9ff4c9a1e)

### Admin View
Admin have access to all pages that guests and users do. Admin have access to pages that guests and users do not.

1.Home View
![admin-home](https://github.com/Yunchov98/Ultraclean/assets/107936254/0b47868b-c815-4ff1-af3f-e048b52dd131)

2.Cleaning Requests View
![cleaning-requests](https://github.com/Yunchov98/Ultraclean/assets/107936254/500318e7-78a1-4bab-9939-719225f45f2b)

3.Add Service View
![add-service-form](https://github.com/Yunchov98/Ultraclean/assets/107936254/3e90e713-999d-4028-b433-78c2b52bf225)

4.Job Requests View
![job-request-admin](https://github.com/Yunchov98/Ultraclean/assets/107936254/0e13e914-7939-45a3-9693-68472a755b5f)

5.Services View
![our-services-admin](https://github.com/Yunchov98/Ultraclean/assets/107936254/595a1ccf-4140-4ff0-9e4f-114f381c3e31)

6.Edit Service View
![edit-service](https://github.com/Yunchov98/Ultraclean/assets/107936254/b905ad5b-061a-4fb1-b8a2-8316d589d672)

7.Profile View
![accepted-orders-admin](https://github.com/Yunchov98/Ultraclean/assets/107936254/0e130efe-0ae9-4b0f-a692-aabd5a81d790)
![rejected-oreders-admin](https://github.com/Yunchov98/Ultraclean/assets/107936254/58b1a91c-f5cd-4da6-b362-d7e4168b56dd)
![finished-oreders-admin](https://github.com/Yunchov98/Ultraclean/assets/107936254/79bf2da3-379a-4894-bc80-48a60ca7bc81)

8.Our Team View
![our-team-admin](https://github.com/Yunchov98/Ultraclean/assets/107936254/b10940f4-2886-4ae5-b0a7-d00257c54fa9)
