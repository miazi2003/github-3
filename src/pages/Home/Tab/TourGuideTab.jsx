import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import TourGuideTabCard from './TourGuideTabCard';

const TourGuideTab = () => {
    const axiosSecure = useAxiosSecure()

  const { data: randomData = [], isLoading, isError } = useQuery({
    queryKey: ['randomTours'],
    queryFn: async () => {
      const res = await axiosSecure.get('/random-guides');
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Something went wrong!</p>;
  console.log(randomData)



    return (
        <div>
           <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4'>
             {randomData.map((guide , idx)=><TourGuideTabCard guide={guide} key={idx}></TourGuideTabCard>)}
           </div>
        </div>
    );
};

export default TourGuideTab;