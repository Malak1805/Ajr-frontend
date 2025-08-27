import  { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import './App.css'
import RegisterForm from './pages/RegisterForm'
import LoginForm from './pages/LoginForm'
import Posts from './pages/Posts'
import AddPost from './components/AddPost'
import PostDetail from './pages/PostDetail'
import { useState } from 'react'

function App() {

const [posts, setPosts] = useState([
    {
      _id: '1',
      title: 'Help Fund School Supplies for Orphan Students',
      description: 'We are raising funds to provide essential school supplies to underprivileged children in our community. Your contribution will help them succeed in their studies.',
      goal_amount: 1500,
      userId: {
        first_name: 'Amal',
        last_name: 'Center'
      }
    },
    {
      _id: '2',
      title: 'Support a Local Animal Shelter',
      description: 'Our animal shelter is in urgent need of funds to cover food, medical care, and facility maintenance for stray and rescued animals. Every donation counts.',
      goal_amount: 5000,
      userId: {
        first_name: 'Safe',
        last_name: 'Haven'
      }
    },
    {
      _id: '3',
      title: 'Medical Aid for A single father',
      description: 'A local family is facing a medical crisis and needs financial assistance to cover hospital bills and treatment costs. Let\'s show our support.',
      goal_amount: 10000,
      userId: {
        first_name: 'Peter',
        last_name: 'Jones'
      }
    },
    {
      _id: '4',
      title: 'Medical Support for an Elderly Patient\'s Dialysis',
      description: 'An elderly woman is in urgent need of financial assistance to cover her life-saving kidney dialysis treatments. Your donation will directly support her medical care and improve her quality of life.',
      goal_amount: 7500,
      userId: {
        first_name: 'Hope',
        last_name: 'Foundation'
      }
    },
    {
      _id: '5',
      title: 'Help a Child With Severe Hear Loss Fund a Hearing Aid',
      description: 'A young child with severe hearing loss needs a hearing aid to communicate, learn, and grow. Your generosity can open up their world to sound, education, and social connection.',
      goal_amount: 3000,
      userId: {
        first_name: 'Future',
        last_name: 'Smiles'
      }
    },
    {
      _id: '6',
      title: 'Emergency Shelter for Families Affected by Fire',
      description: 'Provide immediate support to families who have lost their homes and belongings in recent fires. Your donation will help with emergency housing, food, and essential supplies to help them rebuild their lives.',
      goal_amount: 4500,
      userId: {
        first_name: 'United',
        last_name: 'Front'
      }
    }
  ]);

  return (
    <>
    <main>
      <h1>Place Your Donations Now!</h1>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home posts={posts}/>} />
        <Route path='/posts/new' element={<AddPost setPosts={setPosts} />} />
        <Route path='/posts/:id' element={<PostDetail posts={posts} />} />
        <Route path='/posts' element={<Posts posts={posts} />} />
        <Route path='/auth/register' element={<RegisterForm />} />
        <Route path='/auth/login' element={<LoginForm />} />
      </Routes>
      </main>
    </>
  )
}

export default App
