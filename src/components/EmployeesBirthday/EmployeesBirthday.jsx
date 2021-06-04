import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import selector from '../Employees/Employees.selector';
import styles from './EmployeesBirthday.module.css';
import Employee from '../Employee/Employee';

const EmployeesBirthday = ({ listIds, setListId }) => {
  const [mas, setmas] = useState([]);
  const [search, setsearch] = useState();

  const months = [
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    ' December',
    'January',
    'February',
    'March',
    'April'
  ];
  const { employees } = useSelector(selector);

  const getValidDate = (data) => {
    const date = new Date(data);
    const month = date.toLocaleString('en', { month: 'long' });
    const year = date.toLocaleString('en', { year: 'numeric' });
    const day = date.toLocaleString('en', { day: 'numeric' });

    return `${day} ${month}, ${year} year`;
  };

  const handleonclick = (idd) => {
    const tenp = JSON.parse(window.localStorage.getItem('employees'));
    const result = tenp.filter((id) => id != idd);
    window.localStorage.setItem('employees', JSON.stringify(result));

    setListId(result);
  };
  const submitData = (e) => {
    e.preventDefault();
    const tenp = JSON.parse(window.localStorage.getItem('employees'));

    let lst = [];
    employees.forEach((employee) => {
      lst.push(employee);
    });

    let result = lst.filter((element) => element.lastName === search);
    lst = [];
    console.log(result);

    result.forEach((element) => {
      lst.push(element.id);
    });
    window.localStorage.setItem('employees', JSON.stringify(lst));
    setListId(lst);

    console.log(lst);
  };

  const HandleOnChange = (event) => {
    setsearch(event.target.value);
  };

  const renderEmployeesBirthday = (month) => {
    const employeesIds = JSON.parse(window.localStorage.getItem('employees'));
    const employeesListId = employeesIds ? employeesIds : [];

    let list = [];

    employeesListId.forEach((element) => {
      employees.forEach((employee) => {
        if (employee.id === element) {
          list.push(employee);
        }
      });
    });
    const filteredList = list?.filter(({ dob }) => {
      const date = new Date(dob);
      const monthName = date.toLocaleString('en', { month: 'long' });
      if (month === monthName) {
        return true;
      } else {
        return false;
      }
    });

    let sortedList = filteredList.sort((a, b) => {
      if (a.lastName < b.lastName) {
        return -1;
      } else {
        return 1;
      }
    });

    if (sortedList.length > 0) {
      return (
        <div className={styles['ebirthday-month']}>
          <div className={styles['Name-of-month']}>{month}</div>
          {sortedList.map((employee) => (
            <div key={`${employee.id}birth`}>
              {employee.lastName} {employee.firstName} -{' '}
              {getValidDate(employee.dob)}
              <button onClick={() => handleonclick(employee.id)}>delete</button>
            </div>
          ))}
        </div>
      );
    } else {
      return;
    }
  };
  const listIDSprot = JSON.parse(window.localStorage.getItem('employees'));

  return (
    <div className={styles['ebirthday']}>
      <form onSubmit={submitData} onChange={HandleOnChange}>
        <input type="text" size="40"></input>
        <input type="submit" value="Отправить"></input>
      </form>
      <div className={styles['ebirthday-title']}>Employees Birthday</div>
      <div className={styles['ebirthday-months']}>
        {listIDSprot?.length === 0 ? (
          <div className={styles['ebirtday-empty']}>
            Employees List is empty
          </div>
        ) : (
          months.map((month, index) => (
            <div key={index}>{renderEmployeesBirthday(month)}</div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmployeesBirthday;
