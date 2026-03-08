import {useActionState} from "react";
import supabase from "./supabase-client.ts";

interface Metric {
    name: string;
    total: number;
}

interface FormProps {
    metrics: Metric[];
}

function Form({ metrics }: FormProps) {

    const [error, submitAction, isPending] = useActionState(
        async (_previousState: any, formData: FormData) => {
            const newDeal = {
                name: formData.get('name'),
                value: formData.get('value'),
            };
            // @ts-ignore
            const { error} = await supabase.from('sales_deals').insert(newDeal);
            if(error){
                return error
            }
           return null
    },
        null
    );

    const generateOptions = () => {
        return metrics.map((metric: Metric) => (
            <option key={metric.name} value={metric.name}>
                {metric.name}
            </option>
        ));
    };

    return (
        <div className="add-form-container">
            <form
                action={submitAction}
                aria-label="Add new sales deal"
                aria-describedby="form-description"
            >
                <div id="form-description" className="sr-only">
                    {/*Use this form to add a new sales deal. Select a sales rep and enter*/}
                    {/*the amount.*/}
                </div>

                <label htmlFor="deal-name">
                    Name:
                    <select
                        id="deal-name"
                        name="name"
                        defaultValue={metrics?.[0]?.name || ''}
                        aria-required="true"
                        aria-invalid={error ? 'true' : 'false'}
                        // disabled=
                    >
                        {generateOptions()}
                    </select>
                </label>

                <label htmlFor="deal-value">
                    Amount: $
                    <input
                        id="deal-value"
                        type="number"
                        name="value"
                        defaultValue={0}
                        className="amount-input"
                        min="0"
                        step="10"
                        aria-required="true"
                        // aria-invalid=
                        aria-label="Deal amount in dollars"
                        disabled={isPending}
                    />
                </label>

                <button
                    type="submit"
                    disabled={isPending}
                    aria-busy={isPending}
                >
                    {isPending ? 'Adding...' : 'Add Deal'}
                </button>
            </form>

            {
                error && (
                    <div role={'alert'} className={'error-message'}>
                        {error?.message}
                    </div>
                )
            }
        </div>
    );
};

export default Form;
