// OperationsTable.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOperationsData } from './operationsSlice';
import DataTable from './DataTable'; // Assuming this is your custom table component
import Loader from './Loader'; // Assuming you have a loader component

const OperationsTable = () => {
  const dispatch = useDispatch();
  const { operations, loading, error } = useSelector((state) => state.operations);

  useEffect(() => {
    dispatch(fetchOperationsData());
  }, [dispatch]);

  const columns = [
    { key: 'firstname', title: 'First Name', dataIndex: 'firstname' },
    { key: 'lastname', title: 'Last Name', dataIndex: 'lastname' },
    { key: 'email', title: 'Email', dataIndex: 'email' },
    { key: 'phone number', title: 'phone number', dataIndex: 'phone number' },
    {
      key: 'action',
      title: 'Action',
      render: (row) => <button onClick={() => alert(`Viewing ${row.firstname} ${row.lastname}`)}>View</button>,
    },
  ];

  return (
    <div>
      {loading && <Loader />}
      {error && <p>Error: {error}</p>}
      {operations && operations.length > 0 ? (
        <DataTable 
          data={operations} 
          columns={columns} 
          pagination 
        />
      ) : (
        !loading && <p>No operations data available.</p>
      )}
    </div>
  );
};

export default OperationsTable;
