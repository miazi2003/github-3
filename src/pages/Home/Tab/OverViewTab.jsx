import React from 'react';
import { useQuery } from '@tanstack/react-query';

import OverViewTabCard from './OverViewTabCard';
import useAxiosSecure from '../../../hook/useAxiosSecure';


const OverViewTab = () => {
const axiosSecure = useAxiosSecure()

  const { data: randomData = [], isLoading, isError } = useQuery({
    queryKey: ['randomTours'],
    queryFn: async () => {
      const res = await axiosSecure.get('/random-tours');
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Something went wrong!</p>;
  console.log(randomData)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {randomData.map((tour, idx) =><OverViewTabCard data={tour} key={idx}></OverViewTabCard> )}
    </div>
  );
};

export default OverViewTab;
