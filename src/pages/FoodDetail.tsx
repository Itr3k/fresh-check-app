
import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
    name: id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    category: 'General',
    image: '/placeholder.svg',
    description: 'Information about food storage and shelf life.'
};
