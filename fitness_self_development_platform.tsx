import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Flame, 
  Utensils, 
  TrendingUp, 
  CheckCircle2, 
  Circle, 
  Play, 
  Pause, 
  RotateCcw, 
  Calendar, 
  Award, 
  ArrowRight, 
  Zap, 
  Heart, 
  ShieldCheck, 
  User, 
  Droplet 
} from 'lucide-react';

export default function App() {
  // Navigation & Onboarding State
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [userProfile, setUserProfile] = useState({
    segment: 'structure', // 'start', 'structure', 'new'
    goal: 'strength', // 'strength', 'weight_loss', 'endurance', 'mobility'
    name: 'Атлет'
  });
  
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'workouts', 'nutrition', 'progress'

  // Workout Interactive State
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(45);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [completedExercises, setCompletedExercises] = useState({});

  // Nutrition & Daily State
  const [waterGlasses, setWaterGlasses] = useState(3);
  const [caloriesConsumed, setCaloriesConsumed] = useState(1450);
  const dailyCalorieGoal = 2200;

  // Timer Effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(sec => sec - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Workout data generator based on user goal
  const getWorkoutPlan = () => {
    switch (userProfile.goal) {
      case 'weight_loss':
        return {
          title: 'HIIT Сжигание Калорий',
          duration: '30 мин',
          intensity: 'Высокая',
          calories: '350 ккал',
          exercises: [
            { id: 1, name: 'Бёрпи с прыжком', sets: '4 подхода по 45 сек', completed: false },
            { id: 2, name: 'Альпинист (Mountain Climbers)', sets: '4 подхода по 50 сек', completed: false },
            { id: 3, name: 'Выпрыгивания из приседа', sets: '3 подхода по 15 раз', completed: false },
            { id: 4, name: 'П Plank Jack', sets: '3 подхода по 60 сек', completed: false }
          ]
        };
      case 'endurance':
        return {
          title: 'Кардио и Выносливость',
          duration: '40 мин',
          intensity: 'Средняя',
          calories: '420 ккал',
          exercises: [
            { id: 1, name: 'Интервальный бег на месте', sets: '5 раундов по 2 мин', completed: false },
            { id: 2, name: 'Прыжки со скакалкой (или имитация)', sets: '4 подхода по 90 сек', completed: false },
            { id: 3, name: 'Боковые выпады динамические', sets: '3 подхода по 20 раз', completed: false },
            { id: 4, name: 'Растяжка и дыхание', sets: '5 мин', completed: false }
          ]
        };
      case 'mobility':
        return {
          title: 'Функциональная Мобильность',
          duration: '25 мин',
          intensity: 'Низкая',
          calories: '180 ккал',
          exercises: [
            { id: 1, name: 'Поза кошка-корова', sets: '3 подхода по 10 раз', completed: false },
            { id: 2, name: 'Глубокий присед с разворотом', sets: '3 подхода по 10 раз', completed: false },
            { id: 3, name: 'Растяжка грудного отдела', sets: '3 подхода по 45 сек', completed: false },
            { id: 4, name: 'Мобилизация тазобедренных суставов', sets: '2 подхода на каждую сторону', completed: false }
          ]
        };
      default: // strength
        return {
          title: 'Силовой Комплекс: База',
          duration: '45 мин',
          intensity: 'Высокая',
          calories: '380 ккал',
          exercises: [
            { id: 1, name: 'Приседания с собственным весом (или отягощением)', sets: '4 подхода по 12 раз', completed: false },
            { id: 2, name: 'Отжимания от пола (классические/с колен)', sets: '4 подхода по 10-15 раз', completed: false },
            { id: 3, name: 'Ягодичный мостик', sets: '3 подхода по 15 раз', completed: false },
            { id: 4, name: 'Планка на предплечьях', sets: '3 подхода по 45 сек', completed: false }
          ]
        };
    }
  };

  const currentWorkout = getWorkoutPlan();

  // Toggle exercise completion in current workout
  const toggleExercise = (id) => {
    setCompletedExercises(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (!hasCompletedOnboarding) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-6 font-sans">
        <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl">
              <Zap size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-white">Платформа Развития</h1>
              <p className="text-sm text-slate-400">Твой личный проводник к сильному телу и привычкам</p>
            </div>
          </div>

          <div className="space-y-6 my-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Как тебя зовут?</label>
              <input 
                type="text" 
                value={userProfile.name}
                onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Введи имя"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Какая у тебя ситуация? (Выбери сегмент)</label>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'start', title: 'Не знаю с чего начать', desc: 'Нужен плавный старт и базовые привычки' },
                  { id: 'structure', title: 'Нужна конкретная структура', desc: 'Хочу четкий план тренировок и питания' },
                  { id: 'new', title: 'Хочу попробовать новое', desc: 'Ищу разнообразие в нагрузках и челенджи' }
                ].map(item => (
                  <div 
                    key={item.id}
                    onClick={() => setUserProfile({...userProfile, segment: item.id})}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      userProfile.segment === item.id 
                        ? 'bg-emerald-500/10 border-emerald-500 text-white' 
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-slate-200">{item.title}</div>
                    <div className="text-xs mt-1 text-slate-400">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Главная цель</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'strength', title: 'Сила и Тонус' },
                  { id: 'weight_loss', title: 'Жиросжигание' },
                  { id: 'endurance', title: 'Выносливость' },
                  { id: 'mobility', title: 'Здоровая спина / Мобильность' }
                ].map(item => (
                  <div 
                    key={item.id}
                    onClick={() => setUserProfile({...userProfile, goal: item.id})}
                    className={`p-3 rounded-xl border text-center cursor-pointer text-sm font-medium transition-all ${
                      userProfile.goal === item.id 
                        ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400' 
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={() => setHasCompletedOnboarding(true)}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
          >
            <span>Начать свой путь</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col md:flex-row">
      
      {/* Sidebar Navigation (Desktop) */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-emerald-500 text-slate-950 rounded-xl font-black">
              <Zap size={22} />
            </div>
            <div>
              <h2 className="font-extrabold text-white text-lg leading-none">FitPulse</h2>
              <span className="text-xs text-emerald-400 font-medium">Трансформация тела</span>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: 'Главная', icon: Activity },
              { id: 'workouts', label: 'План Тренировок', icon: Flame },
              { id: 'nutrition', label: 'Питание & Вода', icon: Utensils },
              { id: 'progress', label: 'Прогресс', icon: TrendingUp },
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                    isActive 
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' 
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              {userProfile.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <div className="font-bold text-sm truncate text-white">{userProfile.name}</div>
              <div className="text-xs text-slate-400 truncate">Цель: {userProfile.goal === 'weight_loss' ? 'Жиросжигание' : userProfile.goal === 'endurance' ? 'Выносливость' : userProfile.goal === 'mobility' ? 'Мобильность' : 'Сила'}</div>
            </div>
          </div>
          <button 
            onClick={() => setHasCompletedOnboarding(false)}
            className="w-full mt-2 text-xs text-slate-400 hover:text-emerald-400 py-1 border-t border-slate-800 transition-colors text-center block"
          >
            Изменить профиль
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500 text-slate-950 rounded-lg font-black">
            <Zap size={18} />
          </div>
          <span className="font-extrabold text-white">FitPulse</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <User size={16} />
          <span>{userProfile.name}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24 md:pb-8 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">

          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Welcome banner */}
              <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-500/20 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-xl">
                <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold mb-3">
                    День 1 • Программа активирована
                  </div>
                  <h1 className="text-2xl md:text-3xl font-black text-white mb-2">Привет, {userProfile.name}! 💪</h1>
                  <p className="text-slate-400 text-sm md:text-base max-w-lg">
                    Мы подготовили персональный комплекс на сегодня под твою цель. Структурируй тренировку, следи за питанием и достигай результатов без выгорания.
                  </p>
                </div>
              </div>

              {/* Quick stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                  <div className="text-slate-400 text-xs font-medium mb-1 flex items-center gap-1.5">
                    <Flame size={14} className="text-orange-400" /> Сожжено калорий
                  </div>
                  <div className="text-2xl font-extrabold text-white">340 <span className="text-xs text-slate-500 font-normal">ккал</span></div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                  <div className="text-slate-400 text-xs font-medium mb-1 flex items-center gap-1.5">
                    <Droplet size={14} className="text-blue-400" /> Водный баланс
                  </div>
                  <div className="text-2xl font-extrabold text-white">{waterGlasses} <span className="text-xs text-slate-500 font-normal">/ 8 стаканов</span></div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                  <div className="text-slate-400 text-xs font-medium mb-1 flex items-center gap-1.5">
                    <Award size={14} className="text-emerald-400" /> Прогресс недели
                  </div>
                  <div className="text-2xl font-extrabold text-white">14%</div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                  <div className="text-slate-400 text-xs font-medium mb-1 flex items-center gap-1.5">
                    <Activity size={14} className="text-purple-400" /> Серия дней
                  </div>
                  <div className="text-2xl font-extrabold text-white">3 <span className="text-xs text-slate-500 font-normal">дня</span></div>
                </div>
              </div>

              {/* Today's Workout Quick Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                      <Flame size={22} />
                    </div>
                    <div>
                      <h2 className="font-bold text-white text-lg">План на сегодня</h2>
                      <p className="text-xs text-slate-400">{currentWorkout.title} • {currentWorkout.duration}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveTab('workouts')}
                    className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold px-4 py-2 rounded-xl transition-colors"
                  >
                    Открыть план
                  </button>
                </div>

                <div className="space-y-2 mt-4">
                  {currentWorkout.exercises.slice(0, 3).map((ex, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                      <div className="flex items-center gap-3 text-sm">
                        <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 text-xs flex items-center justify-center font-bold">{idx + 1}</span>
                        <span className="font-medium text-slate-200">{ex.name}</span>
                      </div>
                      <span className="text-xs text-slate-400">{ex.sets}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nutrition daily tip */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-500/10 text-orange-400 rounded-xl shrink-0">
                    <Utensils size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Совет по питанию сегодня</h3>
                    <p className="text-sm text-slate-400">
                      Для твоей цели важно держать баланс белка. Употребляй около 1.6г белка на 1 кг веса и не забывай про сложные углеводы за 2 часа до тренировки.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveTab('nutrition')}
                  className="w-full md:w-auto shrink-0 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-5 py-3 rounded-xl transition-colors"
                >
                  Все рекомендации
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: WORKOUTS */}
          {activeTab === 'workouts' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                <div>
                  <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Интерактивный комплекс</span>
                  <h1 className="text-2xl font-black text-white mt-1">{currentWorkout.title}</h1>
                  <p className="text-sm text-slate-400 mt-1">Интенсивность: {currentWorkout.intensity} | Расход: {currentWorkout.calories}</p>
                </div>
                
                {/* Built-in timer */}
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex items-center gap-4 w-full md:w-auto justify-between">
                  <div>
                    <div className="text-xs text-slate-400">Таймер отдыха</div>
                    <div className="text-2xl font-mono font-black text-emerald-400">
                      00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className={`p-3 rounded-xl font-bold transition-all ${
                        isTimerRunning ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500 text-slate-950'
                      }`}
                    >
                      {isTimerRunning ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                    <button 
                      onClick={() => { setIsTimerRunning(false); setTimerSeconds(45); }}
                      className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
                    >
                      <RotateCcw size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Exercise checklist */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                <h3 className="font-bold text-white text-lg mb-4">Упражнения в комплексе</h3>
                <div className="space-y-3">
                  {currentWorkout.exercises.map((ex) => {
                    const isDone = completedExercises[ex.id];
                    return (
                      <div 
                        key={ex.id}
                        onClick={() => toggleExercise(ex.id)}
                        className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                          isDone 
                            ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-400' 
                            : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <button className={`text-emerald-400 transition-colors ${isDone ? 'opacity-100' : 'text-slate-600'}`}>
                            {isDone ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                          </button>
                          <div>
                            <div className={`font-semibold ${isDone ? 'line-through text-slate-500' : 'text-white'}`}>{ex.name}</div>
                            <div className="text-xs text-slate-400 mt-0.5">{ex.sets}</div>
                          </div>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full ${isDone ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                          {isDone ? 'Выполнено' : 'Сделать'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: NUTRITION */}
          {activeTab === 'nutrition' && (
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                <h1 className="text-2xl font-black text-white mb-2">Питание и Гидратация</h1>
                <p className="text-sm text-slate-400">Контролируй калории и водный баланс для наилучшего восстановления.</p>
              </div>

              {/* Calorie Progress Bar */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-white">Калории за сегодня</h3>
                  <span className="text-sm text-slate-400 font-mono">{caloriesConsumed} / {dailyCalorieGoal} ккал</span>
                </div>
                <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 mb-4">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all"
                    style={{ width: `${Math.min(100, (caloriesConsumed / dailyCalorieGoal) * 100)}%` }}
                  ></div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setCaloriesConsumed(prev => prev + 250)}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-xs font-bold py-2.5 rounded-xl transition-colors text-slate-300"
                  >
                    + Добавить перекус (250 ккал)
                  </button>
                  <button 
                    onClick={() => setCaloriesConsumed(prev => prev + 500)}
                    className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-bold py-2.5 rounded-xl transition-colors"
                  >
                    + Полноценный обед (500 ккал)
                  </button>
                </div>
              </div>

              {/* Water Tracker */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
                      <Droplet size={22} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">Водный баланс</h3>
                      <p className="text-xs text-slate-400">Рекомендуется 8 стаканов в день</p>
                    </div>
                  </div>
                  <div className="text-xl font-black text-blue-400">{waterGlasses} / 8</div>
                </div>

                <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                  {[...Array(8)].map((_, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setWaterGlasses(idx + 1)}
                      className={`h-14 rounded-2xl border flex flex-col items-center justify-center cursor-pointer transition-all ${
                        idx < waterGlasses 
                          ? 'bg-blue-500/20 border-blue-500 text-blue-400 font-bold shadow-md shadow-blue-500/10' 
                          : 'bg-slate-950 border-slate-800 text-slate-600 hover:border-slate-700'
                      }`}
                    >
                      <Droplet size={18} />
                      <span className="text-[10px] mt-0.5">{idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PROGRESS */}
          {activeTab === 'progress' && (
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                <h1 className="text-2xl font-black text-white mb-2">Твой Прогресс и Достижения</h1>
                <p className="text-sm text-slate-400">Следи за ключевыми этапами своего саморазвития.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                  <div className="text-slate-400 text-xs font-semibold mb-2">Дней в программе</div>
                  <div className="text-4xl font-black text-white">3 <span className="text-sm text-emerald-400 font-medium">длительная серия</span></div>
                  <div className="mt-4 text-xs text-slate-400">Отличный старт! Следующая цель — 7 дней подряд.</div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                  <div className="text-slate-400 text-xs font-semibold mb-2">Тренировок завершено</div>
                  <div className="text-4xl font-black text-white">3 <span className="text-sm text-emerald-400 font-medium">комплекса</span></div>
                  <div className="mt-4 text-xs text-slate-400">Сожжено около ~1050 ккал за всё время.</div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                  <div className="text-slate-400 text-xs font-semibold mb-2">Уровень атлета</div>
                  <div className="text-4xl font-black text-emerald-400">Новичок</div>
                  <div className="mt-4 text-xs text-slate-400">До уровня "Любитель" осталось 4 тренировки.</div>
                </div>
              </div>

              {/* Achievements badges */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                <h3 className="font-bold text-white text-lg mb-4">Бейджи и Награды</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-950 border border-emerald-500/40 p-4 rounded-2xl text-center">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 font-bold text-xl">
                      🚀
                    </div>
                    <div className="font-bold text-sm text-white">Первый шаг</div>
                    <div className="text-[10px] text-slate-400 mt-1">Пройден онбординг и создан план</div>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-center opacity-60">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 text-slate-500 flex items-center justify-center mx-auto mb-3 font-bold text-xl">
                      🔥
                    </div>
                    <div className="font-bold text-sm text-slate-300">Неделя огня</div>
                    <div className="text-[10px] text-slate-500 mt-1">Занимайся 7 дней подряд</div>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-center opacity-60">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 text-slate-500 flex items-center justify-center mx-auto mb-3 font-bold text-xl">
                      💧
                    </div>
                    <div className="font-bold text-sm text-slate-300">Водный баланс</div>
                    <div className="text-[10px] text-slate-500 mt-1">Выпей 8 стаканов воды за день</div>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-center opacity-60">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 text-slate-500 flex items-center justify-center mx-auto mb-3 font-bold text-xl">
                      ⭐
                    </div>
                    <div className="font-bold text-sm text-slate-300">Профи</div>
                    <div className="text-[10px] text-slate-500 mt-1">Заверши 30 тренировок</div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-3 flex items-center justify-around z-50">
        {[
          { id: 'dashboard', label: 'Главная', icon: Activity },
          { id: 'workouts', label: 'План', icon: Flame },
          { id: 'nutrition', label: 'Питание', icon: Utensils },
          { id: 'progress', label: 'Прогресс', icon: TrendingUp },
        ].map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs transition-colors ${
                isActive ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

    </div>
  );
}