# Code Repository - Commit and Workflow Guide (GitLab)

This document outlines the recommended workflow for committing and working with the code in this repository. Following these guidelines will help ensure a smooth collaboration and maintain the stability of the `develop` branch.

## Workflow Overview

1. Create a branch from `develop`: Before working on any new feature or bug fix, create a branch from the `develop` branch. The branch name should follow the format: `bug-xyz`, `feature-xyz`, or `revision-xyz`.

2. Committing Changes: All commits must be made on the specific branch you created in the previous step. Commit your changes regularly, ensuring that each commit represents a logical and functional unit of work.

3. Refine and Test: Continuously refine and test your code on the branch until it is in a stable and working state.

4. Create a Merge Request: When your code is ready to be integrated into the main codebase, create a merge request from your branch into the `develop` branch.

5. Review Process: Request reviews for your merge request. Ideally, involve someone from the **DeepRead** team and **someone from your own development team**.

6. Merge or Revise: On approval, merge your changes into the `develop` branch. On rejection, make the necessary corrections and ask for a new review.

## Detailed Workflow Steps

### 1. Create a Branch

To create a new branch, use the following git command:
`git checkout -b <branch-name> develop`

Replace `<branch-name>` with an appropriate name, such as `bug-fix-issue-123`, `feature-new-feature`, or `revision-improvement-456`.

### 2. Committing Changes

Make your code changes and commit them with descriptive messages:

`git add .`
`git commit -m "Brief description of changes"`
`git push <branch-name> `

Commit regularly and avoid including unrelated changes in a single commit.

### 3. Refine and Test

Test your changes thoroughly on the branch to ensure they work as expected and do not introduce any regressions.
Please read and keep in mind the guidelines for improving and maintaining the quality of our code found at the end of this file.

### 4. Create a Merge Request

When you are confident in your changes and they are ready for review, create a merge request using the repository's preferred method (e.g., GitHub Pull Request or **GitLab Merge Request**) from your branch into the `develop` branch.

### 5. Review Process

Ask for reviews from appropriate team members, including someone from the `deepread` team and your own development team. Be open to feedback and iterate on your changes based on the review comments.

### 6. Merge or Revise

If your merge request is approved, you can merge your changes into the `develop` branch. If it is rejected, make the necessary corrections, update the branch, and repeat the review process.

---

# DeepRead - React App

1. Install all dependencies: `npm install`
   1.1 Install amplify component (please contact Mauro before doing this, so he can send the CLI key access):
   - `npm install -g @aws-amplify/cli`
   - `amplify pull --appId d3577kcca6axmh --envName staging`
   - This will show the following:
      Opening link: https://eu-north-1.admin.amplifyapp.com/admin/xxxx
      Confirm login in the browser or manually paste in your CLI login key:`
   - Send this link to [Mauro Guerini](mailto:mauro.guerini71@gmail.com), you will receive a CLI login key in return
   - Select the choices given IDE (whichever you are using) > javascript > react > src > build > npm run-script build > npm run-script start > N (you will not modify the backend)
2. ENV variables, need to be created, check the example.env, copy, rename to .env and then fill out the needed variables depending on your environments.
   - There are 3 environments: DEV, STAGING, PROD
   1. **DEV**: is to be used for local deployments
   2. **STAGING**: used to deploy on our virtual server (app.deepread.com)
   3. **PROD**: used to launch on our k8s cluster (frontend.deepread.com, name will change in the future)
3. Key differences:
   1. DEV: should run local, has additional debbugings, can hot reload, etc.
   2. STAGING: should only if needed include hot reload (quick fixes are faster visible like this)
   3. PROD: none, the most optimal setup, no errors if possible, _no console logs at all (!!!NO TOKENS!!!, NO ID'S!!!)_
4. ENV variable for the API endpoints:
   - REACT_APP_API_URL=https://app.deepread.com
   - depends on the ENV variable, but generally for frontend development use the one provided, as described above
5. ENV variable for the DeepRead chrome extension for the Amazon synchronization:
   - REACT_APP_CHROME_EXTENSION_ID=gophnfcdaafgoihhbpcjcdechglninhp (you need to install it for chromium based browsers: [DeepRead-Extension](https://chrome.google.com/webstore/detail/deepread-beta-extension/gophnfcdaafgoihhbpcjcdechglninhp?utm_source=ext_sidebar&hl=en-US))
   - After you have installed the extension the extension ID can be found in Manage extensions in the Extensions menu (the puzzle piece next to the URL bar)
6. ENV variables for the Google Custom Search Engine, in case the image search (for idea cards) is needed:
   - REACT_APP_GOOGLE_CSE_ID and REACT_APP_GOOGLE_API_KEY_FOR_CSE
   - To get the CSE ID and API KEY follow the instructions at the bottom of this page: https://www.npmjs.com/package/googleimg
7. Run the application: `npm start` (will launch on Port 3000 by React default)

---

# Guidelines for improving and maintaining the quality of our code

To create and support as smooth and pleasant development experience as possible for the whole team, please keep in mind and follow the following guidelines.

### 1. Please do your utmost to avoid duplicate code, functions, components,..

- Whenever the same functionality is repeated in two different places, create a common reusable component/function for it, and make sure to use that in all appropriate places.
- Keep in mind reasonable lengths for functions, components, modules/files and refactor when it becomes relevant.
- Each component preferably in its own file.

### 2. Please pay close attention to the logical, precise naming of variables, functions, classes, files

- Reading the name should give the developer clear understanding what the purpose of that variable/function/etc is.
- If necessary make a short comment on what is not clear from the name alone, while keeping in mind that primarily the names should provide the necessary information.
- Follow consistent camelCase/PascalCase naming (avoid using snake\*case):
  - Variables: `computeSumOfArray`
  - Functions: `GetLibraryElements`
  - Classes: `AmazonConnector`

More good practices: https://google.github.io/styleguide/tsguide.html

### 3. Please follow folder structure and file naming conventions:

- Use PascalCase for file and folder names, for example: `MyNotes.js`
- Avoid using index.js for the main component in the folder.
- Name components and modules in accordance to their functionality not to their implementation details.
- As with code elements the file/folder names should indicate clearly what the purpose of it is.
- All the files related to the same component / feature should reside in the same folder.
- Use components folder for reusable components.
- Use pages folder for each page in the UI.

### 4. Please remove all unused code, variables, imports, packages, whenever it becomes unnecessary or when finding some

- Make sure packages are up-to-date and functional, update/fix when necessary.

### 5. Please maintain consistent state for the app.

- Please avoid data duplicates/passing down data from component to component, when there is a possibility it will be changed elsewhere and all the instances might not update.
- Use Redux slices for any data that needs to be shared between multiple components and/or updated in the UI when state changes to keep data and state for all of them consistently same and updated. This makes the data flow and state management more predictable and manageable.
- Use the useSelector to get any data that can be changed within the state.
- Use dispatch+reducers to update the state when needed.

### 6. Please avoid printing on the console in production.

- To achieve this, use the customLog function from helperFunctions instead of console.log for any logging that is left in committed code.

### 7. Please make sure all there eslint errors and/or console warnings are fixed before committing your code.

### 8. Please test thoroughly, before committing.

- If there is an instance where a commit with issues is warranted, comment on the commit what the issue and state is.

### 9. When you find code not adhering to above guidelines, refactoring is allowed and encouraged, while taking care to keep the functionality intact.

Remember it's a process, we don't have a perfect state regarding this nor do we need to fix everything right this moment.
Often it's easier to just let things be and yet every action towards a clean base encourages better practices and creates better development experience now and in the future.
We appreciate your effort!
