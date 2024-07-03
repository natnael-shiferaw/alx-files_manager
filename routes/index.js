import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

const router = Router();

// Endpoint to check the status of the application
router.get('/status', AppController.getStatus);

// Endpoint to retrieve application statistics
router.get('/stats', AppController.getStats);

// Endpoint to create a new user
router.post('/users', UsersController.postNew);

// Endpoint to authenticate user
router.get('/connect', AuthController.getConnect);

// Endpoint to disconnect user
router.get('/disconnect', AuthController.getDisconnect);

// Endpoint to retrieve current user information
router.get('/users/me', UsersController.getMe);

// Endpoint to upload a file
router.post('/files', FilesController.postUpload);

// Endpoint to retrieve file information by ID
router.get('/files/:id', FilesController.getShow);

// Endpoint to retrieve list of files
router.get('/files', FilesController.getIndex);

// Endpoint to publish a file
router.put('/files/:id/publish', FilesController.putPublish);

// Endpoint to unpublish a file
router.put('/files/:id/unpublish', FilesController.putUnpublish);

// Endpoint to retrieve file data
router.get('/files/:id/data', FilesController.getFile);

module.exports = router;
