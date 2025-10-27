import React from 'react';
import { useRouter } from 'expo-router';
import Onboarding, { OnboardingSlide } from '../../components/onboarding';

const slides: OnboardingSlide[] = [
  {
    id: '1',
    image: require('../../assets/images/ecosystem.png'),
    text: 'Sua segurança é a nossa prioridade. Conte com um ambiente protegido para cuidar de quem você ama sem preocupações.',
    buttonText: 'Começar',
  },
  {
    id: '2',
    image: require('../../assets/images/medicine.png'),
    text: 'Acompanhe a saúde de perto e com carinho. Tenha a tranquilidade de saber que o bem-estar está sendo monitorado a todo momento.',
    buttonText: 'Próximo',
  },
  {
    id: '3',
    image: require('../../assets/images/medical-app.png'),
    text: 'Tudo organizado para o seu bem-estar. Crie e acompanhe um plano de cuidados personalizado com facilidade e confiança.',
    buttonText: 'Próximo',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();

  const handleComplete = () => {
    router.push('./authScreen');
  };

  return <Onboarding slides={slides} onComplete={handleComplete} />;
}
