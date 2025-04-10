
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFinanceManagerData } from './financeManagerSlice';
import DataTable from './DataTable'; 
import Loader from './Loader'; 

const FinanceManagerTable = () => {
  const dispatch = useDispatch();
  const { financeManager, loading, error } = useSelector((state) => state.financeManager);

  useEffect(() => {
    dispatch(fetchFinanceManagerData());
  }, [dispatch]);

  // Define columns for the table (firstname, lastname, email)
  const columns = [
    { key: 'firstname', title: 'First Name', dataIndex: 'firstname' },
    { key: 'lastname', title: 'Last Name', dataIndex: 'lastname' },
    { key: 'email', title: 'Email', dataIndex: 'email' },
  ];

  return (
    <div>
      {loading && <Loader />}
      {error && <p>Error: {error}</p>}
      {financeManager && financeManager.length > 0 ? (
        <DataTable
          data={financeManager}
          columns={columns}
          pagination
          currentPage={1}
          itemsPerPage={10}
          onPageChange={(page) => console.log(`Switched to page ${page}`)}
        />
      ) : (
        !loading && <p>No finance manager data available.</p>
      )}
    </div>
  );
};

export default FinanceManagerTable;
