import { TranslateBody } from '@/types/types';
import { Translate } from '@/utils';

export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { src, inputText, model, selectedPath} =
      (await req.json()) as TranslateBody;

    const response = await Translate(
      src,
      inputText,
      model,
      selectedPath
    );

    return new Response(JSON.stringify(response), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error processing your request' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
};

export default handler;
