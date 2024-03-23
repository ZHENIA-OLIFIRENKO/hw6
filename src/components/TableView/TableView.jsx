import React from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../redux/selectors';
import '../../styles/Main.scss';

const TableView = () => {
    const products = useSelector(selectProducts);

    if (!Array.isArray(products)) {
        return <p>Loading...</p>;
    }

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr className='table-tr'>
                        <th className='table-th'>Product Name</th>
                        <th className='table-th'>Price</th>
                        <th className='table-th'>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr className='table-tr' key={product.article}>
                            <td className='table-td'>{product.name}</td>
                            <td className='table-td'>{product.price}</td>
                            <td className='table-td'>{product.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableView;