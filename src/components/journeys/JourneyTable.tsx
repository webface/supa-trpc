import { format } from 'date-fns';
import { useTranslation } from 'next-i18next';

import { InferQueryOutput } from '@/server/trpc-helper';

// import TablePagination from '@/components/journeys/TablePagination';

type RowProps = {
  journey: InferQueryOutput<'connection.get'>[number];
  handleDelete: (id: number) => void;
};

const JourneyRow: React.FC<RowProps> = ({ journey, handleDelete }) => {
  const departureTime = new Date(journey.departureTime);
  const arrivalTime = new Date(journey.arrivalTime);

  const { t } = useTranslation('journeys');

  return (
    <tr>
      <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6">
        {format(departureTime, 'dd.MM.yyyy')}
      </td>
      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
        {journey.departureStation} ({format(departureTime, 'HH:mm')})
      </td>
      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
        {journey.arrivalStation} ({format(arrivalTime, 'HH:mm')})
      </td>
      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{journey.distance} km</td>
      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
        {journey.duration} {t('minutes', { count: journey.duration })}
      </td>
      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{journey.stops}</td>
      <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
        <button onClick={() => handleDelete(journey.id)} className="text-primary hover:text-primary-light">
          {t('delete')}
        </button>
      </td>
    </tr>
  );
};

type TableProps = {
  journeys: InferQueryOutput<'connection.get'>;
  handleDelete: (id: number) => void;
};

export const JourneyTable: React.FC<TableProps> = ({ journeys, handleDelete }) => {
  const { t } = useTranslation('journeys');

  return (
    <div className="flex flex-col">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    {t('date')}
                  </th>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    {t('departure')}
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    {t('destination')}
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    {t('distance')}
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    {t('duration')}
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    {t('stops')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {journeys.map((journey) => (
                  <JourneyRow journey={journey} key={journey.id} handleDelete={handleDelete} />
                ))}
              </tbody>
            </table>
            {/* TODO: implement pagination, virtual list or something similar */}
            {/* <TablePagination count={journeys.count} page={journeys.page} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
