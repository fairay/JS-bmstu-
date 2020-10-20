ok :- 5<6.
nok :- 5>6.
input(A, B, C) :- 	write("Input interval [A, B]:\n"), read(A), read(B),
				write("Input C:\n"), read(C);
				nok.
print_num(A) :- write(A), write("\n"), ok.

div_ab(N, STEP, MIN, MAX) :-	NEXT is (N+STEP),
								N =< MAX, N >= MIN, print_num(N), div_ab(NEXT, STEP, MIN, MAX);
    							NEXT is (N+STEP),
								N =< MAX, div_ab(NEXT, STEP, MIN, MAX);
								ok.

main :- input(A, B, C), A =< B, div_ab(0, C, A, B); 
		ok.
