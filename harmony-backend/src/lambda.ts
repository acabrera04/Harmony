import serverless from 'serverless-http';
import { createApp } from './app';

// Wraps the Express app for AWS Lambda deployment (used in P6).
// The handler is exported as the Lambda function entry point.
export const handler = serverless(createApp());
