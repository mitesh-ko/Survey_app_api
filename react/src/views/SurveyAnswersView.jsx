import { LinkIcon, PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import TButton from "../components/core/TButton.jsx";
import PageComponent from "../components/PageComponent.jsx";
import axiosClient from "../axios.js";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function SurveyAnswersView() {
  const { showToast } = useStateContext();
  const navigate = useNavigate();
  const { slug } = useParams();

  const [answers, setAnswers] = useState();
  const [count, setCount] = useState();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      axiosClient.get(`/survey/${slug}/answer`).then(({ data }) => {
        setAnswers(data.data);
        setCount(data.total);
        setLoading(false);
      });
    }
  }, []);

  const onLoadMore = () => {
      
    setLoading(true);
    
    axiosClient.get(`/survey/${slug}/answer?page=${page+1}`).then(({ data }) => {
        if(data.data.length){
            setPage(page+1);
            setAnswers(prevAnswers => [...prevAnswers, ...data.data]);
        }
        setLoading(false);
    });
  };

  return (
    <PageComponent
      title='Survey Answers'
    >
      {loading && <div className="text-center text-lg">Loading...</div>}
      {!loading && (
        <div className="flex flex-col w-full mx-auto" >
            <div className="font-bold my-3">Total survey answers received: {count}</div>
            
                <div className="drop-shadow-sm bg-gray-60 text-black border border-gray-200 rounded font-bold">
                    <div className="flex flex-col">
                    <table className="w-full border-collapse bg-gray-50 rounded" >
                        <thead>
                            <tr className="bg-gray-60 border-b border-gray-30">
                                <th className="px-4 py-2 mb-3 text-left">Question</th>
                                <th className="px-4 py-2 mb-3 text-left">Answer</th>
                                <th className="px-4 py-2 mb-3 text-left">Answered at</th>
                                <th className="px-4 py-2 mb-3 text-left">Answer id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {answers && answers.map((ans, i) => (
                                <tr className={"px-4 my-2 "+ (i%2 === 0 ? 'bg-gray-50': '')} key={i}>
                                    <td className="px-4 py-2">{ans.question} - ( {ans.type} )</td>
                                    <td className="px-4 py-2">{ans.answer}</td>
                                    <td className="px-4 py-2">{ans.created_at_formatted}</td>
                                    <td className="px-4 py-2">{ans.survey_answer_id}</td>
                                </tr>  
                            ))}
                            {(answers && answers.length !== count) && <tr className="bg-gray-60 border-t border-gray-60 text-center"><td onClick={() => onLoadMore()} colSpan={4} className="p-4 cursor-pointer">Load More...</td></tr>}
                            {(answers && answers.length === count) && <tr className="bg-gray-60 border-t border-gray-60 text-center"><td colSpan={4} className="p-4">---</td></tr>}
                        </tbody>
                    </table>
                </div>
                
            </div>
            
        </div>
      )}
    </PageComponent>
  );
}