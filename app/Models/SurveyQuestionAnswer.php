<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyQuestionAnswer extends Model
{
    use HasFactory;

    protected $table = 'survey_question_answers';

    protected $fillable = ['survey_question_id', 'survey_answer_id', 'answer'];

    public function question()
    {
        $this->belongsTo(SurveyQuestion::class);
    }

    public function answer()
    {
        $this->belongsTo(SurveyAnswer::class);
    }

    public function survey()
    {
        $this->question->survey_id;
    }
}