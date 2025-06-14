import React, { useState, useEffect } from 'react';
import { Plus, Check, Trash2, Star, Calendar, Search, Moon, Sun, Sparkles, Zap, AlertTriangle, X } from 'lucide-react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [newTaskCategory, setNewTaskCategory] = useState('personal');
  const [newTaskDate, setNewTaskDate] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, taskId: null, taskText: '' });

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

  const requestDeleteTask = (id, taskText) => {
    setDeleteConfirmation({ show: true, taskId: id, taskText });
  };

  const confirmDeleteTask = () => {
    if (deleteConfirmation.taskId) {
      setTasks(tasks.filter(task => task.id !== deleteConfirmation.taskId));
    }
    setDeleteConfirmation({ show: false, taskId: null, taskText: '' });
  };

  const cancelDeleteTask = () => {
    setDeleteConfirmation({ show: false, taskId: null, taskText: '' });
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'from-red-500 via-pink-500 to-orange-500';
      case 'medium': return 'from-yellow-500 via-amber-500 to-orange-400';
      case 'low': return 'from-green-500 via-emerald-500 to-teal-500';
      default: return 'from-blue-500 via-purple-500 to-indigo-500';
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

  const darkBg = darkMode ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50';
  const cardBg = darkMode ? 'bg-slate-800/40 border-slate-700/50 backdrop-blur-xl' : 'bg-white/80 border-white/50 backdrop-blur-lg';
  const textPrimary = darkMode ? 'text-white' : 'text-gray-800';
  const textSecondary = darkMode ? 'text-slate-300' : 'text-gray-600';
  const inputBg = darkMode ? 'bg-slate-800/50 border-slate-600 text-white placeholder-slate-400' : 'bg-white border-gray-200 text-gray-800 placeholder-gray-500';

  return (
    <div className={`min-h-screen transition-all duration-700 ${darkBg} relative overflow-hidden`}>
      {deleteConfirmation.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
             style={{ animation: 'fadeIn 0.3s ease-out' }}>
          <div className={`${cardBg} rounded-2xl sm:rounded-3xl p-6 sm:p-8 border shadow-2xl max-w-[90%] sm:max-w-md w-full mx-4 relative overflow-hidden`}
               style={{
                 transform: 'perspective(1000px) rotateX(5deg)',
                 animation: 'slideInScale 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                 boxShadow: '0 25px 50px -12px rgba(239, 68, 68, 0.4)'
               }}>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-pink-500/10 to-orange-500/10 rounded-2xl sm:rounded-3xl"></div>
            
            <div className="relative text-center">
              <div className="mb-4 sm:mb-6">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl"
                       style={{
                         transform: 'perspective(500px) rotateX(10deg)',
                         boxShadow: '0 15px 30px -5px rgba(239, 68, 68, 0.4)'
                       }}>
                    <AlertTriangle className="text-white w-8 h-8 sm:w-10 sm:h-10 animate-pulse" />
                  </div>
                </div>
                <h3 className={`text-xl sm:text-2xl font-bold mb-2 sm:mb-3 ${textPrimary}`}>
                  Delete Task?
                </h3>
                <p className={`${textSecondary} text-base sm:text-lg mb-2`}>
                  Are you sure you want to delete this task?
                </p>
                <div className={`${darkMode ? 'bg-slate-700/50' : 'bg-gray-100/80'} rounded-lg sm:rounded-xl p-3 sm:p-4 border-l-4 border-red-400`}>
                  <p className={`${textPrimary} font-medium text-sm sm:text-base text-left`}>
                    "{deleteConfirmation.taskText}"
                  </p>
                </div>
                <p className={`${textSecondary} text-xs sm:text-sm mt-2 sm:mt-3`}>
                  This action cannot be undone.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                  onClick={cancelDeleteTask}
                  className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl border-2 ${darkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700/50' : 'border-gray-300 text-gray-600 hover:bg-gray-50'} transition-all duration-300 hover:scale-105 font-semibold flex items-center justify-center gap-2 text-base sm:text-lg`}
                  style={{
                    transform: 'perspective(500px) rotateX(-5deg)',
                    boxShadow: '0 5px 15px -5px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <X className="w-4 h-4 sm:w-4 sm:h-4" />
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteTask}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/30 text-base sm:text-lg"
                  style={{
                    transform: 'perspective(500px) rotateX(-5deg)',
                    boxShadow: '0 10px 20px -5px rgba(239, 68, 68, 0.4)'
                  }}
                >
                  <Trash2 className="w-4 h-4 sm:w-4 sm:h-4" />
                  Delete Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse transform-gpu" 
             style={{
               transform: 'translate3d(0, 0, 0) rotateX(45deg) rotateY(45deg)',
               animation: 'float 6s ease-in-out infinite'
             }}></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse transform-gpu" 
             style={{
               transform: 'translate3d(0, 0, 0) rotateX(-45deg) rotateY(45deg)',
               animation: 'float 8s ease-in-out infinite reverse'
             }}></div>
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse transform-gpu"
             style={{
               transform: 'translate3d(-50%, 0, 0) rotateX(30deg) rotateZ(45deg)',
               animation: 'float 10s ease-in-out infinite'
             }}></div>
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent transform rotate-45 scale-150"></div>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-pink-500/10 to-transparent transform -rotate-45 scale-150"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-[100%] sm:max-w-6xl">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
              <div className="relative p-4 sm:p-6 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-3xl shadow-2xl transform hover:scale-110 transition-all duration-500 border border-purple-400/30"
                   style={{
                     transform: 'perspective(1000px) rotateX(10deg) rotateY(-10deg)',
                     boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.5)'
                   }}>
                <Sparkles className="text-white w-8 h-8 sm:w-10 sm:h-10 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </div>
            
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-2"
                  style={{
                    textShadow: '0 0 40px rgba(139, 92, 246, 0.3)',
                    filter: 'drop-shadow(0 4px 8px rgba(139, 92, 246, 0.3))'
                  }}>
                TaskFlow 3D
              </h1>
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 animate-pulse" />
                <span className={`text-sm sm:text-lg font-medium ${textSecondary}`}>
                  Next-Gen Task Management
                </span>
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 animate-pulse" />
              </div>
            </div>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative p-3 sm:p-4 rounded-2xl ${darkMode ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900' : 'bg-gradient-to-r from-slate-700 to-slate-800 text-yellow-300'} hover:scale-110 transition-all duration-300 shadow-2xl border border-yellow-400/30`}
              style={{
                transform: 'perspective(1000px) rotateY(15deg)',
                boxShadow: darkMode ? '0 20px 40px -12px rgba(251, 191, 36, 0.4)' : '0 20px 40px -12px rgba(15, 23, 42, 0.4)'
              }}
            >
              {darkMode ? <Sun className="w-6 h-6 sm:w-7 sm:h-7" /> : <Moon className="w-6 h-6 sm:w-7 sm:h-7" />}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-2xl blur-lg"></div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-10">
          {[
            { icon: Calendar, label: 'Total Tasks', value: tasks.length, gradient: 'from-blue-500 to-purple-600', delay: '0ms' },
            { icon: Check, label: 'Completed', value: completedCount, gradient: 'from-green-500 to-emerald-600', delay: '100ms' },
            { icon: Star, label: 'Pending', value: pendingCount, gradient: 'from-orange-500 to-red-600', delay: '200ms' }
          ].map((stat, index) => (
            <div key={index}
                 className={`${cardBg} rounded-2xl sm:rounded-3xl p-6 sm:p-8 border shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-2 group cursor-pointer`}
                 style={{
                   transform: 'perspective(1000px) rotateX(5deg)',
                   animationDelay: stat.delay,
                   animation: 'slideInUp 0.8s ease-out forwards'
                 }}>
              <div className="flex items-center gap-4 sm:gap-6">
                <div className={`relative p-3 sm:p-4 bg-gradient-to-r ${stat.gradient} rounded-xl sm:rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                     style={{
                       transform: 'perspective(500px) rotateY(-15deg)',
                       boxShadow: '0 15px 30px -5px rgba(139, 92, 246, 0.3)'
                     }}>
                  <stat.icon className="text-white w-6 h-6 sm:w-8 sm:h-8" />
                  <div className="absolute inset-0 bg-white/20 rounded-xl sm:rounded-2xl blur-sm"></div>
                </div>
                <div>
                  <p className={`text-2xl sm:text-4xl font-black ${textPrimary} mb-1`}>{stat.value}</p>
                  <p className={`${textSecondary} font-medium text-sm sm:text-lg`}>{stat.label}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        <div className={`${cardBg} rounded-2xl sm:rounded-3xl p-6 sm:p-8 border shadow-2xl mb-8 sm:mb-10`}
             style={{
               transform: 'perspective(1000px) rotateX(2deg)',
               boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.2)'
             }}>
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="relative group w-full sm:w-auto">
                <Search className={`absolute left-4 top-4 w-5 h-5 ${darkMode ? 'text-slate-400' : 'text-gray-500'} group-focus-within:text-purple-400 transition-colors duration-300`} />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-12 pr-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border ${inputBg} focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 transition-all duration-300 text-base sm:text-lg`}
                  style={{
                    transform: 'perspective(800px) rotateX(5deg)',
                    boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className={`w-full sm:w-auto px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border ${inputBg} focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 transition-all duration-300 text-base sm:text-lg font-medium`}
                style={{
                  transform: 'perspective(800px) rotateX(5deg)',
                  boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.1)'
                }}
              >
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl hover:shadow-purple-500/40 hover:scale-105 group text-base sm:text-lg font-semibold"
              style={{
                transform: 'perspective(800px) rotateX(-5deg)',
                boxShadow: '0 15px 30px -5px rgba(139, 92, 246, 0.4)'
              }}
            >
              <Plus className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" />
              Add Task
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl sm:rounded-2xl"></div>
            </button>
          </div>

          {showAddForm && (
            <div className="mt-6 sm:mt-8 p-6 sm:p-8 bg-gradient-to-br from-slate-800/60 to-slate-700/40 rounded-xl sm:rounded-2xl border-2 border-dashed border-purple-400/30 backdrop-blur-xl"
                 style={{
                   animation: 'slideInDown 0.5s ease-out',
                   transform: 'perspective(1000px) rotateX(-2deg)',
                   boxShadow: 'inset 0 1px 20px rgba(139, 92, 246, 0.1)'
                 }}>
              <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <input
                  type="text"
                  placeholder="Enter your task..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
                  className={`w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border ${inputBg} focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 transition-all duration-300 text-base sm:text-lg`}
                  style={{
                    boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                  className={`w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border ${inputBg} focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 transition-all duration-300 text-base sm:text-lg font-medium`}
                >
                  <option value="low">🟢 Low Priority</option>
                  <option value="medium">🟡 Medium Priority</option>
                  <option value="high">🔴 High Priority</option>
                </select>
                <select
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value)}
                  className={`w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border ${inputBg} focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 transition-all duration-300 text-base sm:text-lg font-medium`}
                >
                  <option value="personal">🏠 Personal</option>
                  <option value="work">💼 Work</option>
                  <option value="health">💪 Health</option>
                  <option value="learning">📚 Learning</option>
                </select>
                <input
                  type="date"
                  value={newTaskDate}
                  onChange={(e) => setNewTaskDate(e.target.value)}
                  className={`w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border ${inputBg} focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 transition-all duration-300 text-base sm:text-lg`}
                />
              </div>
              <button
                onClick={addTask}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-green-500/30 hover:scale-105 text-base sm:text-lg font-semibold"
                style={{
                  boxShadow: '0 10px 20px -5px rgba(34, 197, 94, 0.3)'
                }}
              >
                <Plus className="w-5 h-5 sm:w-5 sm:h-5" />
                Create Task
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4 sm:space-y-6">
          {filteredTasks.length === 0 ? (
            <div className={`${cardBg} rounded-2xl sm:rounded-3xl p-8 sm:p-16 border shadow-2xl text-center`}
                 style={{
                   transform: 'perspective(1000px) rotateX(5deg)',
                   boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.2)'
                 }}>
              <div className="mb-4 sm:mb-6">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl"
                       style={{
                         transform: 'perspective(500px) rotateX(15deg) rotateY(-15deg)',
                         boxShadow: '0 20px 40px -10px rgba(139, 92, 246, 0.4)'
                       }}>
                    <Check className="text-white w-12 h-12 sm:w-16 sm:h-16" />
                  </div>
                </div>
                <h3 className={`text-xl sm:text-3xl font-bold mb-2 sm:mb-3 ${textPrimary}`}>
                  {searchTerm ? 'No matching tasks found' : 'Ready to get productive?'}
                </h3>
                <p className={`${textSecondary} text-base sm:text-xl`}>
                  {searchTerm ? 'Try adjusting your search terms' : 'Create your first task to begin your journey!'}
                </p>
              </div>
            </div>
          ) : (
            filteredTasks.map((task, index) => (
              <div
                key={task.id}
                className={`${cardBg} rounded-xl sm:rounded-2xl p-4 sm:p-6 border shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-[1.01] sm:hover:scale-[1.02] group relative overflow-hidden`}
                style={{
                  transform: `perspective(1000px) rotateX(${2 - index * 0.5}deg)`,
                  animationDelay: `${index * 100}ms`,
                  animation: 'slideInLeft 0.6s ease-out forwards',
                  boxShadow: '0 15px 30px -10px rgba(139, 92, 246, 0.15)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl sm:rounded-2xl"></div>
                
                <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-3 flex items-center justify-center transition-all duration-500 hover:scale-125 transform-gpu ${
                        task.completed
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-400 shadow-lg shadow-green-500/30'
                          : `border-slate-400 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20 ${darkMode ? 'hover:bg-slate-700/50' : 'hover:bg-purple-50'}`
                      }`}
                      style={{
                        transform: task.completed ? 'perspective(500px) rotateY(360deg)' : 'perspective(500px) rotateY(0deg)',
                        transition: 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                      }}
                    >
                      {task.completed && <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-bounce" />}
                    </button>
                    
                    <button
                      onClick={() => requestDeleteTask(task.id, task.text)}
                      className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${darkMode ? 'text-slate-400 hover:text-red-400 hover:bg-red-900/20' : 'text-gray-500 hover:text-red-500 hover:bg-red-50'} transition-all duration-300 opacity-100 sm:opacity-0 group-hover:opacity-100 hover:scale-110 transform-gpu`}
                      style={{
                        transform: 'perspective(500px) rotateY(15deg)',
                        boxShadow: '0 5px 15px -5px rgba(239, 68, 68, 0.2)'
                      }}
                    >
                      <Trash2 className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <span className="text-xl sm:text-2xl transform hover:scale-125 transition-transform duration-300">{getCategoryIcon(task.category)}</span>
                      <span className={`text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r ${getPriorityColor(task.priority)} text-white font-bold uppercase tracking-wide shadow-lg`}
                            style={{
                              boxShadow: '0 4px 15px -3px rgba(139, 92, 246, 0.3)'
                            }}>
                        {task.priority}
                      </span>
                      <span className={`text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full ${darkMode ? 'bg-slate-700/70 text-slate-300' : 'bg-gray-100 text-gray-600'} font-semibold capitalize border`}>
                        {task.category}
                      </span>
                    </div>
                    <p className={`text-base sm:text-xl font-medium ${task.completed ? 'line-through opacity-60' : ''} ${textPrimary} transition-all duration-500 group-hover:text-purple-300`}>
                      {task.text}
                    </p>
                    <p className={`text-xs sm:text-sm mt-1 sm:mt-2 ${textSecondary} flex items-center gap-2`}>
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      Due: {new Date(task.dueDate).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -10px, 0); }
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInScale {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @media (max-width: 639px) {
          [style*="perspective"] {
            transform: none !important;
          }
          .bg-gradient-to-r.from-purple-500\\/20 {
            width: 200px !important;
            height: 200px !important;
            filter: blur(20px) !important;
          }
          .bg-gradient-to-r.from-blue-500\\/20 {
            width: 160px !important;
            height: 160px !important;
            filter: blur(20px) !important;
          }
          .bg-gradient-to-r.from-indigo-500\\/20 {
            width: 200px !important;
            height: 200px !important;
            filter: blur(20px) !important;
          }
          .opacity-10.bg-gradient-to-r {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default App;