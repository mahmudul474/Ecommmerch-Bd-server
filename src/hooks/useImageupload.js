import React, { useState, useEffect } from 'react';

export const useImageupload = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(
      `${process.env.imggBB_URL}`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.data.url;
    } else {
      console.error('Failed to upload image');
      return null;
    }
  } catch (error) {
    console.error('Error uploading image', error);
    return null;
  }
};