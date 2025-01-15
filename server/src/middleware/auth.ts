import express, { Express, NextFunction, Request, Response } from 'express'
import { clerkClient, requireAuth } from '@clerk/express'


const protect = async (req, res) => {
    const userId = req.auth.userId
}