# Upload Images to Cloudinary
---
## This project is a React-based application for uploading images to Cloudinary. It includes an intuitive upload form with features such as file size limits, a maximum of three files, and a preview of selected images before submission.
---
## Features
- **Image Upload to Cloudinary**: Users can select images to upload directly to Cloudinary.
- **Preview Before Upload**: Selected images are displayed as a preview before uploading.

## Technologies
<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
</p>

## Installation

1. **Clone the Repository**:
    ```bash
   git clone https://github.com/Elmoustafi-22/upload-images-cloudinary.git
   cd upload-images-cloudinary
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Cloudinary**:

   - Create an account on [Cloudinary](https://cloudinary.com/) and retrieve your Cloudinary credentials (cloud name, API key, and API secret).
   - Create a `.env` file in the root directory and add your Cloudinary environment variables:

     ```plaintext
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     ```

4. **Set Up MongoDB**:

   - Create an account on [MongoDB](https://www.mongodb.com/) and set up a new database.
   - Create a collection to store image metadata (e.g., `uploads`).
   - In the `.env` file, add your MongoDB connection string:

     ```plaintext
     MONGODB_URI=your_mongodb_connection_string
     ```

5. **Run the Application**:

   ```bash
   npm run dev
   ```

## Usage
1. Select images to upload by clicking the upload button.
2. Ensure that no more than three images are selected and that each meets the file size requirements.
3. Preview the selected images and click the upload button to upload them to Cloudinary.
4. Upon successful upload, image metadata will be saved to MongoDB, and feedback will be provided via toast notifications.


## Contributing

Feel free to fork this repository and create pull requests. All contributions are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---