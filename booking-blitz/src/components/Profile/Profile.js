import { Button } from "react-bootstrap";
import "./Profile.css";

export default function Profile() {
    return(
    <>
    <div class='header'>//user</div>   
    <div class="profile">
    <img src="/image/test.jpg" alt="User Avatar" />
    <div class="profile-info">
        <div class="blue-bg">
            <p class="info-item">Ник: <a className="blue-info">Username</a></p>
            <p class="info-item">Номер телефона: <a className="blue-info">+7 (123) 456-7890</a></p>
            <p class="info-item">Скидка: <a className="blue-info">10%</a></p>
            <p class="info-item">Дата рождения: <a className="blue-info">01.01.1990</a></p>
        </div>
        <div class="yellow-bg">
            <p class="info-item">ФИО: <a className="blue-info">Иванов Иван Иванович</a></p>
            <p class="info-item">Email: <a className="blue-info">example@example.com</a></p>
            <p class="info-item">Адрес: <a className="blue-info">ул. Примерная, д. 123</a></p>
            <p class="info-item">Город: <a className="blue-info">Примерный</a></p>
        </div>
        <div>
            <Button>//Изменить</Button>
            <Button></Button>
        </div>
    </div>
    </div>
        
    </>    
    )
}