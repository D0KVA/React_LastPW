import React, { useEffect, useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import axios from 'axios';

const Home = () => {
    const form = useRef();
    const [products, setProducts] = useState([]);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_tvgsbax', 'template_xkihorl', form.current, 'n1vYhA5-e7lNRwgRt')
            .then(
                () => {
                    console.log('SUCCESS!');
                    form.current.reset(); 
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/media');
                const shuffled = response.data.sort(() => 0.5 - Math.random());
                const selectedProducts = shuffled.slice(0, 10);
                setProducts(selectedProducts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, []);

    return (
        <div className='Home_home'>
            <div className='Home_poizon'>
                <div className='Home_imageContainer'>
                    <img  src='https://cerenas.club/uploads/posts/2022-12/1670929124_cerenas-club-p-fon-dlya-rabochego-stola-dota-krasivo-1.jpg' className='Home_image' alt='Home' />
                    <h1 id='1337' className='Home_text'>
                        У нас есть бф на 40 минуте
                    </h1>
                </div>
            </div>
            <div className='Home_text3' >
                <p >DOTA Shop - это магазин предметов из компьютерной игры DOTA 2</p>
                <p id='support'>Вы можете заказвыать предметы, как из дома, так и из таверны))</p>
            </div>
            <div className='Support_support'>
                <form ref={form} onSubmit={sendEmail} className='Support_form'>
                    <h1 className='Support_text1'>Если у вас есть замечания, обращайтесь.</h1>
                    <div className='Support_data'>
                        <input type='text' name='user_name' className='Support_name Support_input' placeholder='Имя' required />
                        <input type='email' name='user_email' className='Support_mail Support_input' placeholder='Почта' required />
                    </div>
                    <div className='Support_area'>
                        <p className='Support_message'>Сообщение</p>
                        <textarea name='message' rows='5' placeholder='Поле, для ввода сообщения' required></textarea>
                    </div>
                    <div className='Support_send'>
                        <button type='submit' className='Support_sendBtn'>Отправить</button>
                    </div>
                </form>
            </div>
            <div className='Products_section'>
                <h2 style={{ fontSize: 32 }}>Это мы вам рекомендуем</h2>
                <div className='Products_list'>
                    {products.map(product => (
                        <div key={product.id} className='Product_item'>
                            <img src={product.image} alt={product.name} className='Product_image'/>
                            <h3>{product.name}</h3>
                            <p>{product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;