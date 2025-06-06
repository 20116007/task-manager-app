import React, { useState, useEffect } from 'react';
import { Plus, Check, Trash2, Star, Calendar, Filter, Search, Moon, Sun } from 'lucide-react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Design new landing page', completed: false, priority: 'high', category: 'work', dueDate: '2025-06-07' },
    { id: 2, text: 'Buy groceries', completed: false, priority: 'medium', category: 'personal', dueDate: '2025-06-06' },
    { id: 3, text: 'Review pull requests', completed: true, priority: 'high', category: 'work', dueDate: '2025-06-05' }
  ]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [newTaskCategory, setNewTaskCategory] = useState('personal');
  const [newTaskDate, setNewTaskDate] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setNewTaskDate(today);
  }, []);

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask,
        completed: false,
        priority: newTaskPriority,
        category: newTaskCategory,
        dueDate: newTaskDate
      };
      setTasks([task, ...tasks]);
      setNewTask('');
      setShowAddForm(false);
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'from-red-500 to-pink-500';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'low': return 'from-green-500 to-emerald-500';
      default: return 'from-blue-500 to-purple-500';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'work': return '💼';
      case 'personal': return '🏠';
      case 'health': return '💪';
      case 'learning': return '📚';
      default: return '📝';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || 
      (filter === 'completed' && task.completed) ||
      (filter === 'pending' && !task.completed);
    const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.filter(task => !task.completed).length;

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-20 w-72 h-72 ${darkMode ? 'bg-purple-500' : 'bg-blue-400'} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse`}></div>
        <div className={`absolute top-40 right-20 w-72 h-72 ${darkMode ? 'bg-pink-500' : 'bg-purple-400'} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000`}></div>
        <div className={`absolute -bottom-32 left-40 w-72 h-72 ${darkMode ? 'bg-indigo-500' : 'bg-pink-400'} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000`}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-300">
              <Check className="text-white w-8 h-8" />
            </div>
            <h1 className={`text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent ${darkMode ? 'drop-shadow-lg' : ''}`}>
              TaskFlow
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-xl ${darkMode ? 'bg-yellow-500 text-gray-900' : 'bg-gray-800 text-yellow-300'} hover:scale-110 transition-all duration-300 shadow-lg`}
            >
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          </div>
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} font-light`}>
            Transform your productivity with beautiful task management
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className={`${darkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-lg rounded-2xl p-6 border shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                <Calendar className="text-white w-6 h-6" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{tasks.length}</p>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Tasks</p>
              </div>
            </div>
          </div>
          <div className={`${darkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-lg rounded-2xl p-6 border shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                <Check className="text-white w-6 h-6" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{completedCount}</p>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completed</p>
              </div>
            </div>
          </div>
          <div className={`${darkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-lg rounded-2xl p-6 border shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                <Star className="text-white w-6 h-6" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{pendingCount}</p>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className={`${darkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-lg rounded-2xl p-6 border shadow-xl mb-8`}>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative">
                <Search className={`absolute left-3 top-3 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-800 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300`}
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className={`px-4 py-2 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300`}
              >
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Add Task
            </button>
          </div>

          {/* Add Task Form */}
          {showAddForm && (
            <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-xl border-2 border-dashed border-purple-300 dark:border-gray-500 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Enter task..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
                  className={`col-span-1 md:col-span-2 px-4 py-2 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-800 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300`}
                />
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                  className={`px-4 py-2 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300`}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <select
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value)}
                  className={`px-4 py-2 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300`}
                >
                  <option value="personal">Personal</option>
                  <option value="work">Work</option>
                  <option value="health">Health</option>
                  <option value="learning">Learning</option>
                </select>
              </div>
              <div className="flex gap-4 items-center">
                <input
                  type="date"
                  value={newTaskDate}
                  onChange={(e) => setNewTaskDate(e.target.value)}
                  className={`px-4 py-2 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300`}
                />
                <button
                  onClick={addTask}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  Create Task
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className={`${darkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-lg rounded-2xl p-12 border shadow-xl text-center`}>
              <div className="mb-4">
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                  <Check className="text-white w-12 h-12" />
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {searchTerm ? 'No matching tasks' : 'No tasks yet'}
                </h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {searchTerm ? 'Try adjusting your search terms' : 'Add your first task to get started!'}
                </p>
              </div>
            </div>
          ) : (
            filteredTasks.map((task, index) => (
              <div
                key={task.id}
                className={`${darkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-lg rounded-2xl p-6 border shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group animate-slideIn`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      task.completed
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-500'
                        : `border-gray-300 hover:border-purple-500 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-purple-50'}`
                    }`}
                  >
                    {task.completed && <Check className="w-4 h-4 text-white" />}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{getCategoryIcon(task.category)}</span>
                      <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getPriorityColor(task.priority)} text-white font-medium uppercase tracking-wide`}>
                        {task.priority}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} font-medium capitalize`}>
                        {task.category}
                      </span>
                    </div>
                    <p className={`text-lg ${task.completed ? 'line-through opacity-60' : ''} ${darkMode ? 'text-white' : 'text-gray-800'} transition-all duration-300`}>
                      {task.text}
                    </p>
                    <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => deleteTask(task.id)}
                    className={`p-2 rounded-xl ${darkMode ? 'text-gray-400 hover:text-red-400 hover:bg-red-900/20' : 'text-gray-500 hover:text-red-500 hover:bg-red-50'} transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;