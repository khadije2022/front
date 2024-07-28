import React from 'react';
import ArticleCard from '../pages/ArticleCard';

function TrainingPage() {
    return (
        <div className="training-page-container">
            <ArticleCard 
                title="Strength Training" 
                description="In this program, you are trained to improve your strength through many exercises." 
            />
            <ArticleCard 
                title="Cardio Training" 
                description="In this program, you are trained to do sequential moves in range of 20 until 30 minutes." 
            />
            <ArticleCard 
                title="Fat Burning" 
                description="This program is suitable for you who wants to get rid of your fat and lose their weight." 
            />
        </div>
    );
}

export default TrainingPage;
