# Travel Guide Creation with Cloudinary Integration - Complete Guide

## Overview

This guide explains how the travel guide creation has been updated to use Cloudinary for image hosting instead of multipart file uploads.

## Frontend Changes (Completed ✓)

### 1. **Validation Schema Update** (`zod/travel-guide.validation.ts`)

- Changed `coverImage` from accepting `File | URL string` to only `URL string`
- Changed `images` from `File[]` to `string[]` (array of Cloudinary URLs)
- This reflects that uploaded files are now URLs returned by Cloudinary

```typescript
coverImage: z.string().url("Invalid URL").optional().or(z.literal("")),
images: z.array(z.string().url("Invalid image URL")).optional(),
```

### 2. **Form Component Updates** (`components/modules/member/create-guide-form.tsx`)

- File input handling: Users select files as usual
- Cloudinary upload: Before form submission:
  - `coverImage` File → uploaded to Cloudinary → returns secure URL
  - `images` Files → uploaded in parallel → returns array of URLs
- Data submission: Sends JSON payload with Cloudinary URLs to backend

### 3. **Service Integration** (`services/travelGuide/travelGuide.service.ts`)

- Added `createGuide()` method that:
  - Accepts payload with Cloudinary URLs
  - Makes POST request to `/travel-guides` endpoint
  - Returns created guide data

```typescript
createGuide: async (payload: {
  title: string
  description: string
  categoryId: string
  destination?: string
  itinerary?: any[]
  status?: string
  isPaid?: boolean
  price?: number
  coverImage?: string      // Cloudinary URL
  images?: string[]        // Array of Cloudinary URLs
}): Promise<DraftGuide>
```

### 4. **Server Action** (`actions/travel-guide/createGuideAction.ts`)

- Server-side action that calls `travelGuideServices.createGuide()`
- Validates payload before sending
- Returns `IResponse<DraftGuide>` with success/error data

## Frontend Data Flow

```
User Input (Files)
      ↓
Cloudinary Upload (parallel for multiple images)
      ↓
Cloudinary URLs returned
      ↓
Form Validation (with Zod)
      ↓
Create payload with URLs
      ↓
Call createGuideAction
      ↓
Backend receives JSON with URLs
      ↓
Guide created with Cloudinary URLs stored
```

## Backend Changes Required

### 1. **Update Validation Schema**

Create/update your backend validation schema to match the Cloudinary URL structure:

- See `BACKEND_VALIDATION_SCHEMA.ts` in this folder
- Accept `coverImage` as `string` (URL) instead of `File`
- Accept `images` as `string[]` (URL array) instead of `File[]`

### 2. **Update Controller**

Modify your controller to handle JSON payload with URLs:

- See `BACKEND_CONTROLLER_UPDATE.ts` in this folder
- Remove multer file handling for images
- Parse JSON body directly
- Validate with Zod schema
- Pass URLs to service

Key changes:

```typescript
// OLD: Handle multer files
const files = req.files as { coverImage: File[], images: File[] }

// NEW: Handle JSON URLs
const { coverImage, images } = req.body // These are now strings and string[]
```

### 3. **Update Service**

Modify service to store Cloudinary URLs:

- See `BACKEND_SERVICE_UPDATE.ts` in this folder
- Store `coverImage` URL directly in `travelGuide.coverImage` column
- Create `guideMedia` entries with image URLs instead of file paths

Key changes:

```typescript
// Store URL directly
coverImage: data.coverImage || null  // String URL

// Create media records from URLs
if (data.images && Array.isArray(data.images)) {
  await Promise.all(
    data.images.map((imageUrl) =>
      tx.guideMedia.create({
        data: {
          guideId: guide.id,
          type: "image",
          url: imageUrl  // Direct Cloudinary URL
        }
      })
    )
  )
}
```

## API Payload Example

### Before (with file uploads):

```
POST /travel-guides
Content-Type: multipart/form-data

Fields:
- title: "Paris Travel Guide"
- description: "Complete guide to Paris..."
- categoryId: "cmnd123..."
- coverImage: <File>
- images: [<File>, <File>]
- itinerary: "[{...}]"
- isPaid: "true"
- price: "99.99"
- status: "DRAFT"
```

### After (with Cloudinary URLs):

```
POST /travel-guides
Content-Type: application/json

{
  "title": "Paris Travel Guide",
  "description": "Complete guide to Paris...",
  "categoryId": "cmnd123...",
  "coverImage": "https://res.cloudinary.com/dsblzzfib/image/upload/v1234567890/guide_cover.png",
  "images": [
    "https://res.cloudinary.com/dsblzzfib/image/upload/v1234567891/image1.png",
    "https://res.cloudinary.com/dsblzzfib/image/upload/v1234567892/image2.png"
  ],
  "itinerary": [{...}],
  "isPaid": true,
  "price": 99.99,
  "status": "DRAFT"
}
```

## Step-by-step Backend Implementation

1. **Remove Multer Configuration** (if only used for travel guides)
   - Stop accepting multipart file uploads for this endpoint

2. **Update Route Validation**
   - Replace file validation with Zod schema validation
   - Parse and validate JSON body

3. **Update Controller**
   - Receive URLs from JSON body
   - Validate with new schema
   - Pass to service

4. **Update Service**
   - Store coverImage URL in database
   - Create guideMedia records for each image URL
   - Return created guide

5. **Update Response Format**
   - Should return the same structure (guide with media data)
   - Frontend expects `guideMedia` array with URL data

## Cloudinary Configuration (Frontend)

The frontend already has:

- Cloud name: `dsblzzfib`
- Upload preset: `ml_default` (or custom preset)
- Upload URL: `https://api.cloudinary.com/v1_1/dsblzzfib/image/upload`

Make sure the upload preset is configured as **unsigned** for client-side uploads.

## Testing the Integration

### Frontend Test:

1. Navigate to create guide form
2. Fill in form details
3. Select cover image and additional images
4. Submit form
5. Should see upload progress toasts
6. Should see "Guide created successfully" message

### Backend Test (curl):

```bash
curl -X POST http://localhost:5000/travel-guides \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Test Guide",
    "description": "Test description for guide",
    "categoryId": "cmnd123...",
    "coverImage": "https://res.cloudinary.com/dsblzzfib/...",
    "images": ["https://res.cloudinary.com/dsblzzfib/..."],
    "isPaid": false
  }'
```

## Database Schema Considerations

Your Prisma schema should already support this:

```prisma
model TravelGuide {
  coverImage  String?       // URL string
  guideMedia  GuideMedia[]  // Separate media entries
}

model GuideMedia {
  url  String    // Cloudinary URL
}
```

## Benefits of This Approach

1. **Frontend-based uploads** - No server disk space needed
2. **Parallel uploads** - Multiple images upload simultaneously
3. **CDN delivery** - Cloudinary serves images globally
4. **Reduced server load** - No file processing on backend
5. **Cleaner API** - JSON payload instead of multipart
6. **Better error handling** - Clear error messages from validation

## Common Issues & Solutions

### Issue: "Failed to upload image to Cloudinary"

- Check upload preset exists and is marked as unsigned
- Check cloud name is correct
- Verify CORS is enabled for Cloudinary API

### Issue: Backend validation fails

- Make sure backend schema accepts URLs (strings)
- Check that payload has correct field names
- Verify isPaid boolean is being sent correctly

### Issue: Images not displaying

- Check Cloudinary URL is valid
- Verify guideMedia records created in database
- Check database query includes guideMedia relation

## Files Modified/Created

### Frontend (in this workspace):

- ✓ `zod/travel-guide.validation.ts` - Updated schema
- ✓ `components/modules/member/create-guide-form.tsx` - Updated form
- ✓ `services/travelGuide/travelGuide.service.ts` - Added createGuide method
- ✓ `actions/travel-guide/createGuideAction.ts` - New action file

### Backend Documentation (for your backend repo):

- `BACKEND_VALIDATION_SCHEMA.ts` - Schema to implement
- `BACKEND_CONTROLLER_UPDATE.ts` - Controller changes
- `BACKEND_SERVICE_UPDATE.ts` - Service changes

## Next Steps

1. Review the backend documentation files in this folder
2. Implement backend validation schema
3. Update controller to handle JSON payload
4. Update service to store Cloudinary URLs
5. Test the complete flow
6. Deploy changes
