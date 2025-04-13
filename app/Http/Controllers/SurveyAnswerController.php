<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSurveyAnswerRequest;
use App\Models\Survey;
use App\Models\SurveyAnswer;
use App\Models\SurveyQuestion;
use App\Models\SurveyQuestionAnswer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use stdClass;

class SurveyAnswerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Survey $survey)
    {
        $data = SurveyQuestionAnswer::query()
            ->select('survey_question_answers.survey_answer_id', 'question', 'answer', 'survey_question_answers.created_at', 'type')
            ->join('survey_questions', 'survey_questions.id', 'survey_question_answers.survey_question_id')
            ->where('survey_questions.survey_id', $survey->id)
            ->orderBy('survey_question_answers.survey_question_id')
            ->distinct()
            ->paginate(perPage:2, page:intval(request('page') ?? 1));

        $formattedData = $data->getCollection()->map(function($item) {
            $item->created_at_formatted = Carbon::parse($item->created_at)->diffForHumans();
            return $item;
        });

        return response()->json($data->setCollection($formattedData));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSurveyAnswerRequest $request, Survey $survey)
    {
        $validated = $request->validated();

        $surveyAnswer = SurveyAnswer::create([
            'survey_id' => $survey->id,
            'start_date' => date('Y-m-d H:i:s'),
            'end_date' => date('Y-m-d H:i:s'),
        ]);

        foreach ($validated['answers'] as $questionId => $answer) {
            $question = SurveyQuestion::where(['id' => $questionId, 'survey_id' => $survey->id])->get();
            if (!$question) {
                return response("Invalid question ID: \"$questionId\"", 400);
            }

            $data = [
                'survey_question_id' => $questionId,
                'survey_answer_id' => $surveyAnswer->id,
                'answer' => is_array($answer) ? json_encode($answer) : $answer
            ];

            $questionAnswer = SurveyQuestionAnswer::create($data);
        }

        return response("", 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
