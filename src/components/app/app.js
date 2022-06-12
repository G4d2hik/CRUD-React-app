import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: 'Alex', salary: 950, increase: true, raising: false, id: 1 },
                { name: 'John', salary: 1010, increase: false, raising: true, id: 2 },
                { name: 'Frad', salary: 900, increase: true, raising: false, id: 3 }

            ],
            tern: '',
            filter: '>1000$'
        }
        this.maxId = 4;

    }
    deletaItem = (id) => {
        this.setState(({ data }) => {
            // const index = data.findIndex(elem => elem.id == id)

            // const before = data.slice(0, index)
            // console.log(before);
            // const after = data.slice(index + 1)
            // console.log(after);
            // const result = [...before, ...after]

            const newArr = data.filter(item => item.id !== id)

            return {
                data: newArr
            }
        })
    }
    EmployeerAdd = (name, salary) => {
        const newItem = {
            name,
            salary,
            raising: false,
            increase: false,
            id: this.maxId++
        }
        this.setState(({ data }) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }
    onToggleIncrease = (id) => {
        this.setState(({ data }) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return { ...item, increase: !item.increase }
                }
                return item

            })
        }))
    }
    onToggleRise = (id) => {
        this.setState(({ data }) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return { ...item, raising: !item.raising }
                }
                return item

            })
        }))
    }

    searchEmp = (items, tern) => {
        if (tern.length === 0) {
            return items
        }
        return items.filter(item => {
            return item.name.indexOf(tern) > -1
        })
    }

    onUpdateSearch = (tern) => {
        this.setState({ tern })
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case "rise":
                return items.filter(item => item.raising)
            case ">1000$":
                return items.filter(item => item.salary > 1000)
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({ filter });
    }

    render() {

        const { data, tern, filter } = this.state

        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length
        const visebleData = this.filterPost(this.searchEmp(data, tern), filter)
        return (
            <div className='app' >
                <AppInfo
                    employees={employees}
                    increased={increased} />
                <div className="search-panel">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect} />
                </div>
                <EmployeesList
                    data={visebleData}
                    onDelete={this.deletaItem}
                    onToggleIncrease={this.onToggleIncrease}
                    onToggleRise={this.onToggleRise} />
                <EmployeesAddForm
                    onAdd={this.EmployeerAdd} />
            </div>
        );
    }
}
export default App;