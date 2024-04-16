## scripts

```js
npm i
npm run dev

```

Login Page:
Design a login page with fields for username and password using Material UI components.
Implement authentication logic in React to verify the admin's credentials. You can use hardcoded credentials for simplicity.

Admin Dashboard:
After successful login, navigate the admin to the dashboard.
Display a menu with options such as "Users List," "Create User," etc., using Material UI components like AppBar and Drawer.

Users List Page:
Create a page to display the list of users using Material UI Table components.
Show columns for name, email, phone number, and age for each user. Populate the user data statically using an array of objects in your frontend code.

Modals for CRUD Operations:
Implement modals for creating, updating, and deleting users using Material UI Dialog components.
When the admin clicks on "Create User," show a modal with input fields for name, email, phone number, and age. On submission, add the new user to the list.
For updating a user, show a modal with pre-filled data that the admin can edit. Update the user details in the list accordingly.
Implement a confirmation modal for deleting users. On confirmation, remove the user from the list.
