// import { Router } from 'express';
// import { Folder } from '../models/Folder';

// const router = Router();

// // Get all folders for user
// router.get('/', async (req, res) => {
//   try {
//     const folders = await Folder.find({ userId: req.auth.sub });
//     res.json(folders);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching folders' });
//   }
// });

// // Create folder
// router.post('/', async (req, res) => {
//   try {
//     const folder = new Folder({
//       ...req.body,
//       userId: req.auth.sub,
//     });
//     await folder.save();
//     res.status(201).json(folder);
//   } catch (error) {
//     res.status(400).json({ message: 'Error creating folder' });
//   }
// });

// // Update folder
// router.put('/:id', async (req, res) => {
//   try {
//     const folder = await Folder.findOneAndUpdate(
//       { _id: req.params.id, userId: req.auth.sub },
//       req.body,
//       { new: true }
//     );
//     if (!folder) {
//       return res.status(404).json({ message: 'Folder not found' });
//     }
//     res.json(folder);
//   } catch (error) {
//     res.status(400).json({ message: 'Error updating folder' });
//   }
// });

// // Delete folder
// router.delete('/:id', async (req, res) => {
//   try {
//     const folder = await Folder.findOneAndDelete({
//       _id: req.params.id,
//       userId: req.auth.sub,
//     });
//     if (!folder) {
//       return res.status(404).json({ message: 'Folder not found' });
//     }
//     res.json({ message: 'Folder deleted' });
//   } catch (error) {
//     res.status(400).json({ message: 'Error deleting folder' });
//   }
// });

// export const foldersRouter = router;