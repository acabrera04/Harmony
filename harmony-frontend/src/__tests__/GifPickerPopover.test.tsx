import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GifPickerPopover } from '@/components/channel/GifPickerPopover';

const mockFetch = jest.fn();
global.fetch = mockFetch as unknown as typeof fetch;

describe('GifPickerPopover', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Pixabay animations as looping video previews', async () => {
    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        gifs: [
          {
            id: '1',
            title: 'funny cat',
            url: 'https://cdn.pixabay.com/video/cat_tiny.mp4',
            previewUrl: 'https://cdn.pixabay.com/video/cat_tiny.jpg',
            filename: '1.mp4',
            contentType: 'video/mp4',
            sizeBytes: 1,
          },
        ],
      }),
    });

    render(<GifPickerPopover onGifSelect={jest.fn()} />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'funny cat' })).toBeInTheDocument();
    });

    const preview = document.querySelector('video');
    expect(preview).not.toBeNull();
    expect(preview?.tagName).toBe('VIDEO');
    expect(preview).toHaveAttribute('src', 'https://cdn.pixabay.com/video/cat_tiny.mp4');
    expect(preview).toHaveAttribute('poster', 'https://cdn.pixabay.com/video/cat_tiny.jpg');
  });

  it('passes the playable video payload to onGifSelect', async () => {
    const onGifSelect = jest.fn();
    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        gifs: [
          {
            id: '1',
            title: 'funny cat',
            url: 'https://cdn.pixabay.com/video/cat_tiny.mp4',
            previewUrl: 'https://cdn.pixabay.com/video/cat_tiny.jpg',
            filename: '1.mp4',
            contentType: 'video/mp4',
            sizeBytes: 1,
          },
        ],
      }),
    });

    render(<GifPickerPopover onGifSelect={onGifSelect} />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'funny cat' })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'funny cat' }));
    expect(onGifSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        url: 'https://cdn.pixabay.com/video/cat_tiny.mp4',
        previewUrl: 'https://cdn.pixabay.com/video/cat_tiny.jpg',
        contentType: 'video/mp4',
      }),
    );
  });
});
