ok :- 5<6.
nok :- 5>6.
input(A, B) :- write("Input interval [A, B]:\n"), read(A), read(B); nok.
print_num(A) :- write(A), write("\n"), ok.
sqrt_ab(N, MIN, MAX) :-	NN is (N*N), N1 is (N+1),
						NN =< MAX, NN >= MIN, print_num(NN), sqrt_ab(N1, MIN, MAX);
    					NN is (N*N), N1 is (N+1),
						NN =< MAX, sqrt_ab(N1, MIN, MAX);
						ok.

main :- input(A, B), A =< B, sqrt_ab(0, A, B); 
		ok.
