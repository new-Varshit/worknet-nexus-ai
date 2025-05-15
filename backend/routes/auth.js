
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, gender, phoneNumber, dateOfBirth } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      gender,
      phoneNumber,
      dateOfBirth,
      status: 'pending',
      role: 'employee' // Default role, will be changed by admin during approval
    });

    await user.save();

    // No token is provided since user is pending approval
    res.status(201).json({
      message: 'Registration successful. Your account is pending approval.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        status: user.status
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/login
// @desc    Login a user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if user is approved
    if (user.status === 'pending') {
      return res.status(403).json({ message: 'Your account is pending approval' });
    }

    if (user.status === 'rejected') {
      return res.status(403).json({ message: 'Your account has been rejected' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        department: user.department,
        position: user.position,
        profileImage: user.profileImage
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/auth/pending
// @desc    Get all pending users
// @access  Private (Admin, HR)
router.get('/pending', auth, authorize('admin', 'hr'), async (req, res) => {
  try {
    const pendingUsers = await User.find({ status: 'pending' }).select('-password');
    res.json(pendingUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/auth/approve/:id
// @desc    Approve a user and set role
// @access  Private (Admin only)
router.put('/approve/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const { role, department, position } = req.body;

    // Only admin can set roles
    if (!role || !['admin', 'hr', 'employee'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.status !== 'pending') {
      return res.status(400).json({ message: 'User is not pending approval' });
    }

    user.status = 'approved';
    user.role = role;
    if (department) user.department = department;
    if (position) user.position = position;

    await user.save();

    res.json({
      message: 'User approved successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/auth/complete-profile/:id
// @desc    Complete user profile details (for HR)
// @access  Private (HR and Admin)
router.put('/complete-profile/:id', auth, authorize('hr', 'admin'), async (req, res) => {
  try {
    const { department, position, joinDate } = req.body;

    if (!department || !position) {
      return res.status(400).json({ message: 'Department and position are required' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.department = department;
    user.position = position;
    if (joinDate) user.joinDate = joinDate;
    
    // If HR is completing the profile, they can also approve the user
    if (user.status === 'pending') {
      user.status = 'approved';
    }

    await user.save();

    res.json({
      message: 'User profile completed successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        department: user.department,
        position: user.position,
        status: user.status
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/auth/reject/:id
// @desc    Reject a user
// @access  Private (Admin only)
router.put('/reject/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.status !== 'pending') {
      return res.status(400).json({ message: 'User is not pending approval' });
    }

    user.status = 'rejected';
    await user.save();

    res.json({
      message: 'User rejected successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        status: user.status
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
